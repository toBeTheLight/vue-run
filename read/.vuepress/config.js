module.exports = {
  title: 'Vue Running',
  description: '侧重 Vue 各个 API 运行时机的总结',
  themeConfig: {
    nav: [
      {
        text: '诞生',
        link: '/birth/'
      },
      {
        text: '实例化',
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
      '/birth/': [
        {
          title: '构造函数的诞生',
          children: [
            '',
            'base'
          ]
        }
      ],
      '/run/': [
        {
          title: '实例化',
          children: [
            ''
          ]
        }
      ]
    }
  }
}