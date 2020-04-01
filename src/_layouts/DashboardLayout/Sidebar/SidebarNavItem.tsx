import React, { forwardRef, HTMLAttributes } from 'react'
import clsx from 'clsx'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import { NavLink, NavLinkProps } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import Collapse from '@material-ui/core/Collapse'

import { SvgIconProps } from '@material-ui/core/SvgIcon'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconSpacer from '@material-ui/icons/FiberManualRecord'

import { Theme } from '_theme'

export interface SidebarNavItemProps {
  name: string
  link?: string
  Icon?: React.ComponentType<SvgIconProps>
  IconStyles?: React.CSSProperties
  IconClassName?: string
  IconClassNameActive?: string
  isCollapsed?: boolean
  isOpen?: boolean
  isNested?: boolean
  nestingLevel?: number
  nestingOffset?: number
  className?: string
  items?: SidebarNavItemProps[]
  match?: object
}

export interface ListItemLinkProps extends NavLinkProps {}

export interface ListItemComponentProps extends HTMLAttributes<HTMLElement> {
  link?: string | null
  children?: any
  isCollapsed?: boolean | null
}

// ----------------------------------------------------------------------

export const ListItemLink: React.ExoticComponent<NavLinkProps> = forwardRef(
  (props: ListItemLinkProps, ref: React.Ref<HTMLAnchorElement>) => (
    <NavLink exact {...props} innerRef={ref} />
  ),
)

// Can be a link, or button
export const ListItemComponent: React.ExoticComponent<
  ListItemComponentProps
> = forwardRef((props: ListItemComponentProps, ref: React.Ref<HTMLDivElement>) => {
  // Omit isCollapsed
  const { isCollapsed, ...newProps } = props
  const classes = useStyles()

  const component =
    typeof props.link === 'string' ? (
      <ListItem {...newProps} button component={ListItemLink} to={props.link} />
    ) : (
      <ListItem {...newProps} button />
    )

  return (
    <div ref={ref} className={clsx(isCollapsed && classes.navItemCollapsedWrapper)}>
      {component}
    </div>
  )
})

const SidebarNavItem: React.FC<SidebarNavItemProps> = (props: SidebarNavItemProps) => {
  const {
    name,
    link,
    Icon,
    IconStyles = {},
    IconClassName = '',
    isCollapsed,
    // isNested,
    nestingLevel = 0,
    nestingOffset = 16,
    className,
    items = [],
  } = props
  const isTooltipEnabeld = isCollapsed
  const classes = useStyles()
  const hasChildren = items && items.length > 0

  // Flattened array of all children
  function getItemsAll(items: SidebarNavItemProps[]): SidebarNavItemProps[] {
    return items.reduce((allItems: SidebarNavItemProps[], item: SidebarNavItemProps) => {
      // let res = allItems.concat([item])

      if (item.items && item.items.length) {
        return allItems.concat([item], getItemsAll(item.items))
      } else {
        return allItems.concat([item])
      }
    }, [])
  }

  const itemsAll = getItemsAll(items)
  const hasChildrenAndIsActive =
    hasChildren &&
    itemsAll.filter(item => `#${item.link}` === window.location.hash).length > 0
  const isOpen = hasChildrenAndIsActive || false
  const [open, setOpen] = React.useState(isOpen)

  function handleClick() {
    setOpen(!open)
  }

  const ListItemIconInner =
    (!!Icon && <Icon />) ||
    (isCollapsed && <IconSpacer className={classes.iconSpacer} />) ||
    ''

  const nestingOffsetChildren = !isCollapsed ? nestingOffset + 16 : 16

  const ListItemElement = (
    <ListItemComponent
      link={link}
      className={clsx(
        classes.navItem,
        isCollapsed && classes.navItemCollapsed,
        // isNested && !isCollapsed && classes.nested,
        hasChildrenAndIsActive && 'active',
        className,
      )}
      style={{
        fontSize: `${1 - 0.07 * nestingLevel}em`,
        paddingLeft: `${!ListItemIconInner ? nestingOffset + 40 : nestingOffset}px`,
      }}
      isCollapsed={isCollapsed}
      onClick={handleClick}
    >
      {!!ListItemIconInner && (
        <ListItemIcon
          style={IconStyles}
          className={clsx(classes.navItemIcon, IconClassName)}
        >
          {ListItemIconInner}
        </ListItemIcon>
      )}
      <ListItemText primary={name} disableTypography={true} />
      {hasChildren && !open && <IconExpandMore className={classes.iconToggle} />}
      {hasChildren && open && <IconExpandLess className={classes.iconToggle} />}
    </ListItemComponent>
  )

  const ListItemRoot = isTooltipEnabeld ? (
    <Tooltip
      disableFocusListener={!isTooltipEnabeld}
      disableHoverListener={!isTooltipEnabeld}
      disableTouchListener={!isTooltipEnabeld}
      title={name}
      placement="right"
    >
      {ListItemElement}
    </Tooltip>
  ) : (
    ListItemElement
  )

  const ListItemChildren = hasChildren ? (
    <div className={clsx(classes.navItemChildren)}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* <Divider /> */}
        <List component="div" disablePadding>
          {items.map(item => (
            <SidebarNavItem
              {...item}
              isNested={true}
              nestingLevel={nestingLevel + 1}
              isCollapsed={isCollapsed}
              key={item.name || item.link}
              isOpen={open}
              nestingOffset={nestingOffsetChildren}
            />
          ))}
        </List>
      </Collapse>
    </div>
  ) : null

  return (
    <div
      className={clsx(
        hasChildrenAndIsActive && classes.navItemWrapperActive,
        hasChildrenAndIsActive && isCollapsed && classes.navItemWrapperActiveCollapsed,
      )}
    >
      {ListItemRoot}
      {ListItemChildren}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // nested: {
    //   paddingLeft: theme.spacing(10),
    // },
    navItemWrapper: {
      position: 'relative',
    },
    navItemWrapperActive: {
      // background: 'rgba(0, 0, 0, 0.08)',
    },
    navItemWrapperActiveCollapsed: {
      background: 'rgba(0, 0, 0, 0.08)',
    },
    navItem: {
      position: 'relative',
      transition: 'background .23s ease',
      '&.active': {
        color: theme.palette.secondary.main,
        // background: 'rgba(0, 0, 0, 0.08)',
        '& .MuiListItemIcon-root': {
          // color: '#fff',
          color: theme.palette.secondary.main,
        },
      },
    },
    navItemChildren: {
      transition: 'background .23s ease',
      // position: 'absolute',
    },
    navItemChildrenActive: {
      // background: 'rgba(0, 0, 0, 0.1)',
    },
    navItemCollapsed: {
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
      width: theme.sidebar.widthCollapsed,
      '& $iconToggle': {
        position: 'absolute',
        bottom: -1,
        fontSize: 14,
        left: '50%',
        marginLeft: '-0.5em',
      },
      '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',
      },
    },
    navItemCollapsedWrapper: {
      width: theme.sidebar.widthCollapsed,
    },
    navItemIcon: {
      minWidth: 40,
    },
    iconToggle: {},
    iconSpacer: {
      fontSize: 13,
      marginLeft: 6,
    },
  }),
)

export default SidebarNavItem
