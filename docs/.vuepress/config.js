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
        title: 'Home',
        collapsable: false,
        children: [
          '/',
        ]
      },
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/',
          '/guide/getting-started',
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
          '/reference/elements',
          '/reference/device-examples'
        ]
      }
    ]
  }
}
