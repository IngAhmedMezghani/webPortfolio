# Personal Portfolio

A clean, professional portfolio website for Ahmed Mezghani, Computer Science student and aspiring software engineer.

## Features

- **About Me:** Brief introduction and profile photo
- **Projects:** Interactive cards with hover effect, each linking to a GitHub repository
- **Education:** Academic background and achievements
- **Certifications:** Card-style certificates with PDF download/view links
- **Experience:** List of relevant participations
- **Languages:** List of spoken languages
- **Contact:** AJAX-powered contact form with validation and instant feedback
- **Dark Mode:** Toggle for light/dark themes, with persistent preference
- **Responsive Design:** Mobile-friendly layout
- **Downloadable CV:** PDF download link
- **Social Links:** LinkedIn and GitHub

## Usage

1. **Customize Content:**  
   Edit `index.html` to update your name, contact info, project details, and links.
2. **Images:**  
   - Profile photo: `assets/images/profile.jpg`
   - Project images: `projects/`
   - Certificate PDFs: `assets/certificates/`
   - CV: `assets/cv.pdf`
3. **Contact Form:**  
   - The form uses AJAX and a PHP backend (`sendmail.php`) to send emails.
   - For reliable email delivery, configure SMTP in `sendmail.php` (see comments in that file).
4. **Styling:**  
   - All styles are in `css/style.css`.
   - Card borders and dark mode are fully customizable.
5. **JavaScript:**  
   - All interactivity (dark mode, nav, form, project cards) is in `js/main.js`.
6. **Run Locally:**  
   Open `index.html` in your browser. For contact form to work, serve via a local or remote web server with PHP enabled.

## Customization Tips

- Update project and certification links in `index.html` and `js/main.js`.
- Adjust card border colors and dark mode styles in `css/style.css`.
- Replace placeholder images and PDFs with your own.

## Requirements

- Modern web browser
- PHP-enabled server (for contact form email)

---

**Author:** Ahmed Mezghani  
**Contact:** ahmed.mezghani@enis.tn  
**LinkedIn:** [Ing-Ahmed-Mezghani](https://www.linkedin.com/in/Ing-Ahmed-Mezghani)  
**GitHub:** [IngAhmedMezghani](https://github.com/IngAhmedMezghani)
