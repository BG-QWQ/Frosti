import * as React from 'react'
import Giscus from '@giscus/react'

const id = 'inject-comments'

// 获取 DaisyUI 当前主题
function getDaisyTheme() {
  if (typeof window === 'undefined') return 'winter' // 默认浅色
  return document.documentElement.getAttribute('data-theme') || 'winter'
}

// DaisyUI → Giscus 主题映射
const themeMap: Record<string, string> = {
  winter: 'light',   // 浅色模式
  dracula: 'dark',   // 深色模式
}

const Comments = () => {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => {
    // 初始化主题
    const current = getDaisyTheme()
    setTheme(themeMap[current] ?? 'light')

    // 监听 data-theme 改变
    const observer = new MutationObserver(() => {
      const newTheme = getDaisyTheme()
      setTheme(prev => {
        const mapped = themeMap[newTheme] ?? 'light'
        return prev !== mapped ? mapped : prev
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div id={id} className="w-full">
      {mounted && (
        <Giscus
          id={id}
          repo="1502538344/Giscus"
          repoId="R_kgDOPwsfOA"
          category="Announcements"
          categoryId="DIC_kwDOPwsfOM4CvfrM"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="zh-CN"
          loading="lazy"
          theme={theme}
        />
      )}
    </div>
  )
}

export default Comments
