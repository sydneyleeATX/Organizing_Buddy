import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.leesydney.organizingbuddy',
  appName: 'OrganizeAI',
  // webDir must point to where built web application files are located
  webDir: 'out',
  server: {
    // For development - your computer's IP address
    // url: 'http://192.168.1.129:3000', // Local testing with your IP
    // For production - replace with your deployed Vercel URL
    url: 'https://your-app.vercel.app'
  }
};

export default config;
