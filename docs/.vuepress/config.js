module.exports = {
  title: 'DHAP',
  base: '/DHAP-Documentation/',
  description: 'Decentralised Home Automation Protocol Documentation',
  themeConfig: {
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/'
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
