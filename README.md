# 🖥️ Vintage Web Machine

A nostalgic Windows 95/98-style desktop simulator built with modern web technologies. Experience the charm of vintage computing with a fully interactive desktop environment, complete with draggable windows, a taskbar, file explorer, and classic applications.

![Vintage Web Machine Screenshot](https://via.placeholder.com/800x600/008080/FFFFFF?text=Vintage+Desktop+Simulator)

## ✨ Features

### 🎮 Interactive Desktop Experience
- **Authentic Windows 95/98 UI** - Pixel-perfect recreation of the classic desktop environment
- **Draggable & Resizable Windows** - Full window management with minimize, maximize, and close functionality
- **Desktop Icons** - Click and double-click interactions with desktop shortcuts
- **Context Menu** - Right-click desktop context menu with classic options
- **Taskbar** - Functional taskbar with window management and system tray

### 📱 Built-in Applications
- **📝 Notepad** - Text editor with classic Windows styling
- **📁 File Explorer** - Browse through a simulated file system
- **💻 Terminal** - MS-DOS style command prompt interface
- **📧 Guestbook** - Interactive guestbook for visitors
- **⚙️ System Properties** - Display system information
- **🎨 Display Properties** - Customize wallpapers and display settings

### 🎨 Visual Effects
- **CRT Monitor Effect** - Authentic scanlines and screen flicker
- **Retro Typography** - VT323 monospace font for that authentic feel
- **Classic Color Palette** - True-to-original Windows color schemes
- **Wallpaper Support** - Multiple wallpaper options with different display modes

### 🚀 Modern Architecture
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for styling with custom vintage components
- **Vite** for fast development and building
- **shadcn/ui** components adapted for retro styling
- **React Router** for navigation
- **React Query** for state management

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS with custom vintage theme
- **Build Tool:** Vite
- **UI Components:** shadcn/ui (customized for retro look)
- **Icons:** Lucide React
- **State Management:** React Hooks + useReducer
- **Routing:** React Router DOM
- **Data Fetching:** TanStack Query (React Query)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vintage-web-machine.git
   cd vintage-web-machine
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the vintage desktop in action!

## 🎯 Usage

### Customizing Content
The project includes placeholder content that you can easily customize:

1. **Personal Information** - Edit `src/pages/Index.tsx`:
   ```typescript
   export const aboutMeContent = `
   Hello! I'm [Your Name].
   // Add your personal information here
   `;
   ```

2. **Projects** - Update the projects array:
   ```typescript
   export const projects = [
     { id: 'proj1', name: 'Your Project', content: 'Project description...' },
     // Add more projects
   ];
   ```

3. **Contact Information** - Modify the contact details:
   ```typescript
   export const contactInfo = `
   Email: your.email@example.com
   // Add your contact information
   `;
   ```

### Adding New Applications
To add a new application to the desktop:

1. Create a new component in `src/components/`
2. Add the app case to the `renderApp` function in `Index.tsx`
3. Add a desktop icon to the `desktopIcons` array
4. Register the app in the window management system

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components (customized)
│   ├── BootScreen.tsx   # Boot sequence animation
│   ├── DesktopIcon.tsx  # Desktop shortcut icons
│   ├── FileExplorer.tsx # File browser application
│   ├── Notepad.tsx      # Text editor application
│   ├── Terminal.tsx     # Command prompt interface
│   ├── Taskbar.tsx      # Bottom taskbar component
│   ├── Window.tsx       # Draggable window container
│   └── ...              # Other desktop applications
├── pages/
│   ├── Index.tsx        # Main desktop environment
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and vintage theme
```

## 🎨 Customization

### Themes & Wallpapers
- Modify wallpaper options in `DisplayProperties.tsx`
- Add custom CSS classes in `index.css`
- Customize color schemes in the Tailwind config

### Window Behavior
- Adjust default window sizes and positions in `Index.tsx`
- Modify window management logic in the `windowReducer`
- Customize window animations and transitions

## 🚀 Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Windows 95/98 desktop environment
- Built with modern React and TypeScript
- Uses the VT323 font for authentic retro typography
- CRT effects inspired by vintage computer monitors

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/vintage-web-machine](https://github.com/yourusername/vintage-web-machine)

---

*Experience the nostalgia of vintage computing in your modern browser! 🖥️✨*