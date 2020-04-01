import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import IconSales from '@material-ui/icons/MonetizationOn'
import IconProfile from '@material-ui/icons/AccountBox'
import IconAccount from '@material-ui/icons/AccountBalance' //
import IconAdmin from '@material-ui/icons/VpnKey'
import IconMisc from '@material-ui/icons/MoreHoriz'

import IconDashboard from '@material-ui/icons/Dashboard'
import IconProducts from '@material-ui/icons/LocalMall'
import IconOrders from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconPersonalVideo from '@material-ui/icons/PersonalVideo'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import IconQuestionAnswer from '@material-ui/icons/QuestionAnswer'
import IconStars from '@material-ui/icons/Stars'
import IconNewReleases from '@material-ui/icons/NewReleases'
import IconSettings from '@material-ui/icons/Settings'
import IconGroup from '@material-ui/icons/Group'
import IconInfo from '@material-ui/icons/Info' //
import IconPreson from '@material-ui/icons/Person' //
// import IconSync from '@material-ui/icons/Sync'
// import IconPhone from '@material-ui/icons/Phone'
import IconStock from '@material-ui/icons/LocalShipping'
import IconLocation from '@material-ui/icons/LocationOn'

import { Theme } from '_theme'
import SidebarNavItems from './SidebarNavItems'

export interface SidebarNavProps {
  isCollapsed: boolean
}

const SidebarNav = (props: SidebarNavProps) => {
  const { isCollapsed } = props
  const classes = useStyles()

  const itemsSales = [
    {
      name: 'Products',
      Icon: IconProducts,
      items: [
        {
          name: 'All Products',
          link: '/sales/products',
        },
        {
          name: 'Add New',
          link: '/sales/products/new',
        },
        {
          name: 'Categories',
          link: '/sales/products/categories',
        },
      ],
    },
    {
      name: 'Stock',
      link: '/sales/stock',
      Icon: IconStock,
    },
    {
      name: 'Locations',
      link: '/sales/locations',
      Icon: IconLocation,
    },
  ]

  // eslint-disable-next-line
  const itemsContent = [
    {
      name: 'All Items',
      link: '/content/items',
    },
    {
      name: 'Add New',
      link: '/content/items/new',
    },

    {
      name: 'Categories',
      link: '/content/categories',
    },
  ]

  const itemsProfile = [
    {
      name: 'My Profile',
      link: '/profile',
      Icon: IconInfo,
    },
  ]

  const itemsOrganizations = [
    {
      name: 'My Organizations',
      link: '/organizations',
      Icon: IconInfo,
    },
  ]

  const itemsAuth = [
    {
      name: 'Login',
      link: '/auth/login',
    },
  ]

  const itemsAdmin = [
    {
      name: 'Admin Dashboard',
      link: '/admin/dashboard',
      Icon: IconDashboard,
    },
    {
      name: 'All Organizations',
      link: '/admin/accounts',
      Icon: IconAccount,
    },
  ]

  const itemsMisc = [
    {
      name: 'Search',
      link: '/search',
    },
  ]

  // eslint-disable-next-line
  const itemsAppModules = [
    {
      name: 'Sales Management',
      link: '/sales',
      Icon: IconSales,
      items: itemsSales,
    },
    // {
    //   name: 'Customer Support',
    //   link: '/support',
    //   Icon: IconPhone,
    // },
    // {
    //   name: 'Content Management',
    //   link: '/content',
    //   Icon: IconContent,
    //   items: itemsContent,
    // },
    // {
    //   name: 'Services',
    //   link: '/services',
    //   Icon: IconSync,
    // },
  ]

  const itemsCoreModules = [
    {
      name: 'Client',
      Icon: IconPreson,
    },
    {
      name: 'Property',
      Icon: IconPreson,
    },
    {
      name: 'Price Plan',
      Icon: IconPreson,
    },
    {
      name: 'Role Management',
      Icon: IconPreson,
    },
  ]

  return (
    <div>
      <List className={classes.navList} disablePadding>
        {!isCollapsed && (
          <ListSubheader
            disableSticky={true}
            className={classes.navListHeader}
          ></ListSubheader>
        )}
        <SidebarNavItems isCollapsed={isCollapsed} items={itemsCoreModules} />
      </List>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navList: {
      width: theme.sidebar.width,
      fontSize: '1.1em',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    navListHeader: {
      textAlign: 'center',
    },
    iconFeatures: {
      color: '#95de3c',
    },
    iconDocs: {
      color: '#f8cda9',
    },
    iconSupporters: {
      color: '#e3b546',
    },
    iconDiscuss: {
      color: '#ccc',
    },
  }),
)

export default SidebarNav
