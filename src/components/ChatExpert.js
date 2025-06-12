import React, { useState, useRef, useEffect } from 'react';

/**
 * ChatExpert - A simple chat window/modal for AI assistant interaction.
 * Usage: Place <ChatExpert open={open} onClose={handleClose} /> in your page.
 * Props:
 *   - open: boolean (controls visibility)
 *   - onClose: function (called when user closes the chat)
 *
 * NOTE: This is a UI/UX scaffold only. You can wire up any AI API (OpenAI, HuggingFace, etc).
 */
export default function ChatExpert({ open, onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your organizing assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {   // controls progression of chat window
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  if (!open) return null;

  const handleSend = async (e) => {
    e.preventDefault();  // prevent default form submission behavior (prevents page refresh)
    if (!input.trim()) return;  // prevent empty messages
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);
    console.log('[ChatExpert] Sending messages to AI:', newMessages);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',  // HTTP method that tells server you are sending data
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();  // converts server response to JSON so it can be parsed into JavaScript
      console.log('[ChatExpert] AI API response:', data);
      if (!res.ok) throw new Error(data.message || 'AI error');
      setMessages([...newMessages, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      console.error('[ChatExpert] Error contacting AI:', err);
      setError('Sorry, there was a problem contacting the AI.');
    } finally {
      setLoading(false);
      console.log('[ChatExpert] Done waiting for AI response.');
    }
  };

  return (
    <div style={inlineStyles.overlay}>
      <div style={inlineStyles.window}>
        <button style={inlineStyles.closeBtn} onClick={onClose}>&times;</button>
        <h2 style={inlineStyles.header}>Ask an Expert</h2>
        <div style={inlineStyles.messages}>
          {messages.map((msg, i) => (
            <div key={i} style={msg.sender === 'user' ? inlineStyles.userMsg : inlineStyles.aiMsg}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <form style={inlineStyles.inputRow} onSubmit={handleSend}>
          <input
            style={inlineStyles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question..."
            autoFocus
            disabled={loading}
          />
          <button style={inlineStyles.sendBtn} type="submit" disabled={loading || !input.trim()}>
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inlineStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.2)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  window: {
    background: '#fff', borderRadius: 12, width: 350, maxWidth: '90vw', minHeight: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', position: 'relative', padding: '1.5rem 1rem 1rem 1rem'
  },
  closeBtn: {
    position: 'absolute', top: 10, right: 16, background: 'none', border: 'none', fontSize: '1.5rem', color: '#888', cursor: 'pointer'
  },
  header: {
    margin: 0, marginBottom: 12, fontSize: '1.2rem', color: '#007bff', fontWeight: 600
  },
  messages: {
    flex: 1, overflowY: 'auto', marginBottom: 10, padding: '0.5rem', background: '#f6f6f9', borderRadius: 8
  },
  userMsg: {
    alignSelf: 'flex-end', background: '#e0f7fa', color: '#007bff', padding: '0.5rem 0.75rem', borderRadius: 8, margin: '0.25rem 0', maxWidth: '80%'
  },
  aiMsg: {
    alignSelf: 'flex-start', background: '#e9ecef', color: '#333', padding: '0.5rem 0.75rem', borderRadius: 8, margin: '0.25rem 0', maxWidth: '80%'
  },
  inputRow: {
    display: 'flex', alignItems: 'center', gap: 8
  },
  input: {
    flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem'
  },
  sendBtn: {
    background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
  }
};
