import { create } from 'zustand'

type Languages = 'html' | 'css' | 'javascript'

export const generateOutputView = ({
  html,
  css,
  javascript,
}: {
  html: string
  css: string
  javascript: string
}) => {
  // Verifica se o HTML já contém as tags <html> e <head>
  const hasHtmlTag = html.includes('<html')
  const hasHeadTag = html.includes('<head')
  const hasBodyTag = html.includes('<body')

  if (hasHtmlTag && hasHeadTag && hasBodyTag) {
    // Insere o CSS e o JavaScript no documento HTML existente
    return html
      .replace('</head>', `<style>${css}</style></head>`)
      .replace('</body>', `<script>${javascript}</script></body>`)
  } else {
    // Adiciona as tags <html>, <head> e <body> se não estiverem presentes
    return `
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${javascript}</script>
      </body>
      </html>
    `
  }
}

export const generateOutputBrowser = ({
  html,
  css,
  javascript,
}: {
  html: string
  css: string
  javascript: string
}) => {
  const hasHtmlTag = html.includes('<html')
  const hasHeadTag = html.includes('<head')
  const hasBodyTag = html.includes('<body')

  let processedHtml = html

  const replaceLinks = (htmlContent: string) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html')
    const links = doc.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      const target = link.getAttribute('href')?.substring(1)
      link.removeAttribute('href')
      link.setAttribute('onclick', `scrollToSection('${target}')`)
    })

    return doc.documentElement.innerHTML
  }

  if (hasHtmlTag && hasHeadTag && hasBodyTag) {
    processedHtml = processedHtml.replace(
      '</head>',
      `<style>${css}</style></head>`,
    )
    processedHtml = processedHtml.replace(
      '</body>',
      `<script>${javascript} function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }</script></body>`,
    )
  } else {
    processedHtml = `
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${processedHtml}
        <script>${javascript} function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }</script>
      </body>
      </html>
    `
  }

  processedHtml = replaceLinks(processedHtml)

  return processedHtml
}

type OutputLanguagesValue = {
  html: string
  css: string
  javascript: string
}

interface UseApplicationStoreProps {
  html: string
  setHtml: (html: string) => void
  css: string
  setCss: (html: string) => void
  javascript: string
  setJavascript: (html: string) => void

  outputLanguagesValue: OutputLanguagesValue
  setOutputLanguagesValue: (outputValue: OutputLanguagesValue) => void

  languageSelect: string
  setLanguageSelect: (language: Languages) => void

  codeValue: string
  setCodeValue: (codeValue: string) => void
}

export const useApplicationStore = create<UseApplicationStoreProps>((set) => ({
  html: '',
  css: '',
  javascript: '',
  languageSelect: 'html',
  outputLanguagesValue: { html: '', css: '', javascript: '' },
  fontSizeEditor: 14,
  codeValue: '',

  setHtml: (html) => set(() => ({ html })),
  setCss: (css) => set(() => ({ css })),
  setJavascript: (javascript) => set(() => ({ javascript })),
  setLanguageSelect: (language) => set(() => ({ languageSelect: language })),
  setOutputLanguagesValue: (outputValue) => {
    set(() => ({
      outputLanguagesValue: outputValue,
    }))
  },
  setCodeValue: (codeValue) => {
    set(() => ({
      codeValue,
    }))
  },
}))
