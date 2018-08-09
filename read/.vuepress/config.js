module.exports = {
  title: 'Vue Running',
  description: '侧重 Vue 各个 API 运行时机的总结',
  themeConfig: {
    nav: [
      {
        text: '运行流程',
        link: '/run/'
      },
      {
        text: 'API',
        link: '/api/',
      },
      {
        text: '使用注意',
        link: '/use/'
      },
    ],
    sidebar: {
      '/run/': [
        {
          title: '执行流程',
          children: [
            ''
          ]
        }
      ]
    }
  }
}