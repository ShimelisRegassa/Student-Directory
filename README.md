# Student Directory 🎓

A responsive, modern Student Directory application built with vanilla HTML, CSS, and JavaScript.

## Features
- **Form Submission**: Add students with name, department, and academic year.
- **Dynamic Flexbox Cards**: Uses JavaScript `.map()` to render student cards into a responsive Flexbox container.
- **Department Filtering**: Filter students by department (All, Software, Electrical, Mechanical, Civil) using `.filter()`.
- **Modern JavaScript**: Leverages Object Destructuring, ES6 template literals, and Ternary operators (`year >= 4 ? 'Senior' : 'Junior'`).
- **Dark & Light Mode**: Toggleable theme with smooth CSS transitions and persistent `localStorage`.
- **Delete Action**: Quick remove button (`✕`) for removing students with real-time counter updates.
- **XSS Protection**: HTML sanitization on user input rendering.

## File Structure
```
student directory/
├── index.html   # Semantic HTML5 layout
├── style.css    # Flexbox layout, theme variables, and styling
├── app.js       # App logic, array methods, and event listeners
└── README.md    # Documentation and deployment instructions
```

## How to Run Locally
Simply open `index.html` in any modern web browser:
- Double click `index.html`, or
- Use VS Code Live Server extension.

## How to Deploy (for Weekend Mission)
1. **GitHub Pages**:
   - Create a GitHub repository and push this folder.
   - Go to **Settings** > **Pages** > select branch `main` and root folder `/` > Save.
   - Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
2. **Netlify or Vercel**:
   - Drag and drop the `student directory` folder directly into Netlify Drop (https://app.netlify.com/drop).
   - Get your instant live URL and drop it in Telegram!
