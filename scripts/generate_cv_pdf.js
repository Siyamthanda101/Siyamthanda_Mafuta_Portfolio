import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  
  // Embed Standard Fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Standard Letter size: 612 x 792 points
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryNavy = rgb(0.09, 0.23, 0.43); // #173b6e
  const textDark = rgb(0.12, 0.15, 0.18); // #1f262e
  const textMuted = rgb(0.32, 0.38, 0.45); // #526173
  const linkBlue = rgb(0.1, 0.38, 0.74); // #1a61bd
  const lineGray = rgb(0.82, 0.85, 0.88);

  // Helper to wrap text
  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Draw clean vector diamond (representing ❖)
  function drawDiamond(page, centerX, centerY, radius = 3.5, color = primaryNavy) {
    // 4 points of diamond: top, right, bottom, left
    // We can draw it as a small rotated square or small polygon lines
    const half = radius;
    // Draw using two triangles or line segments
    page.drawLine({
      start: { x: centerX, y: centerY + half },
      end: { x: centerX + half, y: centerY },
      thickness: 1.2,
      color,
    });
    page.drawLine({
      start: { x: centerX + half, y: centerY },
      end: { x: centerX, y: centerY - half },
      thickness: 1.2,
      color,
    });
    page.drawLine({
      start: { x: centerX, y: centerY - half },
      end: { x: centerX - half, y: centerY },
      thickness: 1.2,
      color,
    });
    page.drawLine({
      start: { x: centerX - half, y: centerY },
      end: { x: centerX, y: centerY + half },
      thickness: 1.2,
      color,
    });
    // Inner fill point
    page.drawCircle({
      x: centerX,
      y: centerY,
      size: radius * 0.5,
      color,
    });
  }

  // Helper for Section Heading
  function drawSectionHeading(page, title, currentY) {
    page.drawText(title, {
      x: margin,
      y: currentY,
      size: 11,
      font: helveticaBold,
      color: primaryNavy,
    });
    const nextY = currentY - 4;
    page.drawLine({
      start: { x: margin, y: nextY },
      end: { x: pageWidth - margin, y: nextY },
      thickness: 0.8,
      color: lineGray,
    });
    return nextY - 14;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  let page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Header: Name
  const name = 'SIYAMTHANDA MAFUTA';
  const nameWidth = helveticaBold.widthOfTextAtSize(name, 20);
  page1.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    size: 20,
    font: helveticaBold,
    color: primaryNavy,
  });
  y -= 22;

  // Headline
  const headline = 'Computer Engineering Graduate | Software, Networks & Intelligent Systems';
  const headWidth = helveticaBold.widthOfTextAtSize(headline, 11);
  page1.drawText(headline, {
    x: (pageWidth - headWidth) / 2,
    y: y,
    size: 11,
    font: helveticaBold,
    color: textDark,
  });
  y -= 16;

  // Contact line 1
  const contact1 = 'Cape Town, Western Cape, South Africa | 073 066 0155 | mafuta.siyamthand@gmail.com';
  const c1Width = helvetica.widthOfTextAtSize(contact1, 9.5);
  page1.drawText(contact1, {
    x: (pageWidth - c1Width) / 2,
    y: y,
    size: 9.5,
    font: helvetica,
    color: textMuted,
  });
  y -= 14;

  // Contact line 2 (Links)
  const links = 'LinkedIn: linkedin.com/in/siyamthanda-mafuta-0454b51ba | GitHub: github.com/Siyamthanda101';
  const linksWidth = helvetica.widthOfTextAtSize(links, 9);
  page1.drawText(links, {
    x: (pageWidth - linksWidth) / 2,
    y: y,
    size: 9,
    font: helvetica,
    color: linkBlue,
  });
  y -= 22;

  // --- SECTION: PROFESSIONAL SUMMARY ---
  y = drawSectionHeading(page1, 'PROFESSIONAL SUMMARY', y);
  const summaryText =
    'Computer Engineering student with a completed Diploma in Computer Engineering and four months of professional development and collaborative project experience through the CAPACITI Demand Academy. Experience spans software development, networking, databases, embedded systems and artificial intelligence, supported by academic and personal projects. Interested in opportunities to contribute and grow across software, IT infrastructure, networking and intelligent systems.';
  
  const summaryLines = wrapText(summaryText, helvetica, 9.5, contentWidth);
  for (const line of summaryLines) {
    page1.drawText(line, {
      x: margin,
      y: y,
      size: 9.5,
      font: helvetica,
      color: textDark,
    });
    y -= 13.5;
  }
  y -= 10;

  // --- SECTION: TECHNICAL SKILLS ---
  y = drawSectionHeading(page1, 'TECHNICAL SKILLS', y);
  
  const skills = [
    {
      category: 'Software & Development',
      items: 'Python, Java, JavaScript, Node.js, Express, React, HTML, CSS, Backend Development',
    },
    {
      category: 'Networks & Systems',
      items: 'TCP/IP, Routing & Switching, Cisco Networking, Linux, Network Troubleshooting',
    },
    {
      category: 'AI & Data',
      items: 'Artificial Intelligence, Machine Learning Fundamentals, Generative AI, Prompt Engineering, Signal Processing',
    },
    {
      category: 'Databases & Engineering',
      items: 'MySQL, MongoDB, Database Design, ESP32, Arduino, Embedded Systems, MATLAB, Git/GitHub',
    },
  ];

  for (const sk of skills) {
    drawDiamond(page1, margin + 4, y + 3, 3, primaryNavy);
    const prefix = `${sk.category}: `;
    const prefixWidth = helveticaBold.widthOfTextAtSize(prefix, 9.5);
    page1.drawText(prefix, {
      x: margin + 14,
      y: y,
      size: 9.5,
      font: helveticaBold,
      color: textDark,
    });

    const remWidth = contentWidth - prefixWidth - 14;
    const itemLines = wrapText(sk.items, helvetica, 9.5, remWidth);
    
    if (itemLines.length > 0) {
      page1.drawText(itemLines[0], {
        x: margin + 14 + prefixWidth,
        y: y,
        size: 9.5,
        font: helvetica,
        color: textDark,
      });
      y -= 13.5;

      for (let i = 1; i < itemLines.length; i++) {
        page1.drawText(itemLines[i], {
          x: margin + 14,
          y: y,
          size: 9.5,
          font: helvetica,
          color: textDark,
        });
        y -= 13.5;
      }
    } else {
      y -= 13.5;
    }
    y -= 2;
  }
  y -= 8;

  // --- SECTION: PROFESSIONAL DEVELOPMENT ---
  y = drawSectionHeading(page1, 'PROFESSIONAL DEVELOPMENT', y);
  
  page1.drawText('Demand Academy Participant | CAPACITI | Cape Town', {
    x: margin,
    y: y,
    size: 10,
    font: helveticaBold,
    color: textDark,
  });
  const dateText = '2026 - Present';
  const dateWidth = helveticaBold.widthOfTextAtSize(dateText, 10);
  page1.drawText(dateText, {
    x: pageWidth - margin - dateWidth,
    y: y,
    size: 10,
    font: helveticaBold,
    color: textDark,
  });
  y -= 14;

  const capacitiBullets = [
    'Four months of professional development and collaborative project experience through the CAPACITI Demand Academy.',
    'Completed IBM courses in back-end development with Node.js and Express, and front-end development with React, alongside learning in AI, Python and machine learning.',
    'Collaborating on bootcamp projects and building a professional portfolio to showcase technical growth and project experience.',
  ];

  for (const b of capacitiBullets) {
    const bulletLines = wrapText(b, helvetica, 9.5, contentWidth - 16);
    page1.drawCircle({
      x: margin + 6,
      y: y + 3,
      size: 1.8,
      color: primaryNavy,
    });
    for (let j = 0; j < bulletLines.length; j++) {
      page1.drawText(bulletLines[j], {
        x: margin + 16,
        y: y,
        size: 9.5,
        font: helvetica,
        color: textDark,
      });
      y -= 13;
    }
    y -= 2;
  }
  y -= 8;

  // --- SECTION: SELECTED PROJECTS (Page 1) ---
  y = drawSectionHeading(page1, 'SELECTED PROJECTS', y);

  const page1Projects = [
    {
      title: 'PromptCraft AI - AI Content Generator & Prompt Library',
      role: 'CAPACITI Demand Academy — Individual Project | Individual Developer',
      desc: 'An AI-powered content generation platform developed individually as part of the CAPACITI Demand Academy programme. Combines a structured prompt library with interactive generation workflows.',
    },
    {
      title: 'Varsity Path - Digital Varsity Guidance Experience',
      role: 'CAPACITI Demand Academy — Group Project | Researcher & Backend/Data Handling Contributor',
      desc: 'A collaborative CAPACITI Demand Academy project supporting students through a digital varsity guidance experience. Contributed as researcher and supported the team with data handling and backend-related work.',
    },
    {
      title: 'RoadReady Traffic Services',
      role: 'CAPACITI Demand Academy — Collaborative Project | Project Team Member / Developer',
      desc: 'Collaborative software project focused on digital traffic service requests and related operational workflows.',
    },
    {
      title: 'RoadReady Insights',
      role: 'CAPACITI Demand Academy — Collaborative Project | Project Team Member / Developer',
      desc: 'Interactive platform for sharing traffic service experiences and insights.',
    },
  ];

  for (const proj of page1Projects) {
    drawDiamond(page1, margin + 4, y + 3, 3, primaryNavy);
    page1.drawText(proj.title, {
      x: margin + 14,
      y: y,
      size: 10,
      font: helveticaBold,
      color: primaryNavy,
    });
    y -= 13;

    page1.drawText(proj.role, {
      x: margin + 14,
      y: y,
      size: 9,
      font: helveticaOblique,
      color: textMuted,
    });
    y -= 12;

    const projLines = wrapText(proj.desc, helvetica, 9.5, contentWidth - 14);
    for (const line of projLines) {
      page1.drawText(line, {
        x: margin + 14,
        y: y,
        size: 9.5,
        font: helvetica,
        color: textDark,
      });
      y -= 12.5;
    }
    y -= 6;
  }

  // ==========================================
  // PAGE 2
  // ==========================================
  let page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - margin;

  // Mini header on page 2 for recruiter tracking
  page2.drawText('SIYAMTHANDA MAFUTA - CURRICULUM VITAE (PAGE 2)', {
    x: margin,
    y: y2,
    size: 8.5,
    font: helveticaBold,
    color: textMuted,
  });
  const page2HeaderRight = 'mafuta.siyamthand@gmail.com | 073 066 0155';
  page2.drawText(page2HeaderRight, {
    x: pageWidth - margin - helvetica.widthOfTextAtSize(page2HeaderRight, 8.5),
    y: y2,
    size: 8.5,
    font: helvetica,
    color: textMuted,
  });
  y2 -= 4;
  page2.drawLine({
    start: { x: margin, y: y2 },
    end: { x: pageWidth - margin, y: y2 },
    thickness: 0.5,
    color: lineGray,
  });
  y2 -= 18;

  // Remaining Selected Project on Page 2: InfraTrack System
  drawDiamond(page2, margin + 4, y2 + 3, 3, primaryNavy);
  page2.drawText('InfraTrack System', {
    x: margin + 14,
    y: y2,
    size: 10,
    font: helveticaBold,
    color: primaryNavy,
  });
  y2 -= 13;

  page2.drawText('University Academic Group Project | Project Team Member / Developer', {
    x: margin + 14,
    y: y2,
    size: 9,
    font: helveticaOblique,
    color: textMuted,
  });
  y2 -= 12;

  const infraLines = wrapText('A full-stack ticket and infrastructure maintenance management system modelled around the City of Johannesburg Public Works Department workflow (academic prototype).', helvetica, 9.5, contentWidth - 14);
  for (const line of infraLines) {
    page2.drawText(line, {
      x: margin + 14,
      y: y2,
      size: 9.5,
      font: helvetica,
      color: textDark,
    });
    y2 -= 12.5;
  }
  y2 -= 18;

  // --- SECTION: EDUCATION ---
  y2 = drawSectionHeading(page2, 'EDUCATION', y2);

  // Degree 1
  page2.drawText('Bachelor of Engineering Technology in Computer Engineering', {
    x: margin,
    y: y2,
    size: 10,
    font: helveticaBold,
    color: textDark,
  });
  y2 -= 13;

  page2.drawText('Cape Peninsula University of Technology (CPUT) | 2025 - 2026 (Currently Completing)', {
    x: margin,
    y: y2,
    size: 9.5,
    font: helvetica,
    color: textMuted,
  });
  y2 -= 18;

  // Degree 2
  page2.drawText('Diploma in Computer Engineering', {
    x: margin,
    y: y2,
    size: 10,
    font: helveticaBold,
    color: textDark,
  });
  y2 -= 13;

  page2.drawText('Cape Peninsula University of Technology (CPUT) | 2020 - 2024 (Completed)', {
    x: margin,
    y: y2,
    size: 9.5,
    font: helvetica,
    color: textMuted,
  });
  y2 -= 22;

  // --- SECTION: SELECTED CERTIFICATIONS ---
  y2 = drawSectionHeading(page2, 'SELECTED CERTIFICATIONS', y2);

  const certs = [
    'Artificial Intelligence Bootcamp (AI) - CAPACITI / Coursera',
    'Google AI Essentials Specialization - Google',
    'Machine Learning: Regression and Classification - DeepLearning.AI',
    'Generative AI with Large Language Models - DeepLearning.AI / AWS',
    'Python for Data Science, AI & Development - IBM',
    'Introduction to Artificial Intelligence (AI) - IBM',
    'Developing Back-End Apps with Node.js and Express - IBM',
    'Developing Front-End Apps with React - IBM',
    'Additional CAPACITI learning: AI For Everyone, Prompt Engineering, Responsible AI and AI productivity courses',
  ];

  for (const c of certs) {
    const certLines = wrapText(c, helvetica, 9.5, contentWidth - 16);
    page2.drawCircle({
      x: margin + 6,
      y: y2 + 3,
      size: 1.8,
      color: primaryNavy,
    });
    for (let j = 0; j < certLines.length; j++) {
      page2.drawText(certLines[j], {
        x: margin + 16,
        y: y2,
        size: 9.5,
        font: helvetica,
        color: textDark,
      });
      y2 -= 13.5;
    }
    y2 -= 3;
  }

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'documents', 'Siyamthanda_Mafuta_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully wrote CV PDF to ${outputPath} (${pdfBytes.length} bytes)`);
}

generateCV().catch(err => {
  console.error('Error generating CV PDF:', err);
  process.exit(1);
});
