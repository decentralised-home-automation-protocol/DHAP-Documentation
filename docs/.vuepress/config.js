module.exports = {
  title: 'DHAP',
  base: '/DHAP-Documentation/',
  description: 'Decentralised Home Automation Protocol Documentation',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/',
          '/guide/getting-started',
          '/guide/installation'
        ]
      },
      {
        title: 'API',
        collapsable: false,
        children: [
          '/api/',
          '/api/android',
          '/api/ios'
        ]
      },
      {
        title: 'Reference',
        collapsable: false,
        children: [
          '/reference/packet-types',
          '/reference/elements'
        ]
      }
    ]
  }
}
