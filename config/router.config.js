// 通过有限匹配的原则进行路由的匹配。
export default [
  // user
  {
    path: '/access',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/access', redirect: '/access/login' },
      { path: '/access/login', name: 'login', component: './Access/Login' },
      { path: '/access/register', name: 'register', component: './Access/Register' },
      {
        path: '/access/register-result',
        name: 'register.result',
        component: './Access/RegisterResult',
      },
    ],
  },
  // 异常
  {
    path: '/exception',
    component: '../layouts/BlankLayout',
    routes: [
      { path: '/exception', redirect: '/exception/403' },
      {
        path: '/exception/403',
        name: 'not-permission',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        name: 'server-error',
        component: './Exception/500',
      },
      {
        path: '/exception/trigger',
        name: 'trigger',
        hideInMenu: true,
        component: './Exception/TriggerException',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {path: '/', redirect: '/list/tableList'},
      {
        path: '/list/tableList',
        name: 'list',
        icon: 'table',
        component: './List/TableList',
      },
      {
        path: '/user',
        icon: 'user',
        name: 'user',
        routes: [
          {
            path: '/user/userList',
            name: 'userList',
            component: './User/UserList'
          },
          {
            path: '/user/userForm/',
            name: 'userForm',
            component: './User/UserForm'
          },
          {
            path: '/user/userForm/:userId',
            hideInMenu: true,
            name: 'userForm',
            component: './User/UserForm'
          }
        ]
      },
      {
        path: '/auth',
        icon: 'auth',
        name: 'auth',
        routes: [
          {
            path: '/auth/authList',
            name: 'authList',
            component: './Auth/AuthList'
          },
          {
            path: '/auth/authForm/',
            name: 'authForm',
            component: './Auth/AuthForm'
          },
          {
            path: '/auth/authForm/:authId',
            hideInMenu: true,
            name: 'authForm',
            component: './Auth/AuthForm'
          }
        ]
      },
      {
        path: '/role',
        icon: 'role',
        name: 'role',
        routes: [
          {
            path: '/role/roleList',
            name: 'roleList',
            component: './Role/RoleList'
          },
          {
            path: '/role/roleForm/',
            name: 'roleForm',
            component: './Role/RoleForm'
          },
          {
            path: '/role/roleForm/:roleId',
            hideInMenu: true,
            name: 'roleForm',
            component: './Role/RoleForm'
          }
        ]
      },
      {
        path: '/userOrgRole',
        icon: 'userOrgRole',
        name: 'userOrgRole',
        routes: [
          {
            path: '/userOrgRole/userOrgRoleList',
            name: 'userOrgRoleList',
            component: './UserOrgRole/UserOrgRoleList'
          },
          {
            path: '/userOrgRole/userOrgRoleForm/',
            name: 'userOrgRoleForm',
            component: './UserOrgRole/UserOrgRoleForm'
          },
          {
            path: '/userOrgRole/userOrgRoleForm/:userOrgRoleId',
            hideInMenu: true,
            name: 'userOrgRoleForm',
            component: './UserOrgRole/UserOrgRoleForm'
          }
        ]
      },
      {
        path: '/organization',
        icon: 'organization',
        name: 'organization',
        routes: [
          {
            path: '/organization/organizationList',
            name: 'organizationList',
            component: './Organization/OrganizationList'
          },
          {
            path: '/organization/organizationForm/',
            name: 'organizationForm',
            component: './Organization/OrganizationForm'
          },
          {
            path: '/organization/organizationForm/:orgId',
            hideInMenu: true,
            name: 'organizationForm',
            component: './Organization/OrganizationForm'
          }
        ]
      },
      {
        path: '/routine',
        icon: 'routine',
        name: 'routine',
        routes: [
          {
            path: '/routine/routineList',
            name: 'routineList',
            component: './Routine/RoutineList'
          },
          {
            path: '/routine/routineForm/',
            name: 'routineForm',
            component: './Routine/RoutineForm'
          },
          {
            path: '/routine/routineForm/:routineId',
            hideInMenu: true,
            name: 'routineForm',
            component: './Routine/RoutineForm'
          }
        ]
      },
      {
        path: '/dictionary',
        icon: 'dictionary',
        name: 'dictionary',
        routes: [
          {
            path: '/dictionary/dictionaryList',
            name: 'dictionaryList',
            component: './Dictionary/DictionaryList'
          },
          {
            path: '/dictionary/dictionaryForm/',
            name: 'dictionaryForm',
            component: './Dictionary/DictionaryForm'
          },
          {
            path: '/dictionary/dictionaryForm/:dictionaryId',
            hideInMenu: true,
            name: 'dictionaryForm',
            component: './Dictionary/DictionaryForm'
          }
        ]
      },
      {
        path: '/dictionaryType',
        icon: 'dictionaryType',
        name: 'dictionaryType',
        routes: [
          {
            path: '/dictionaryType/dictionaryTypeList',
            name: 'dictionaryTypeList',
            component: './DictionaryType/DictionaryTypeList'
          },
          {
            path: '/dictionaryType/dictionaryTypeForm/',
            name: 'dictionaryTypeForm',
            component: './DictionaryType/DictionaryTypeForm'
          },
          {
            path: '/dictionaryType/dictionaryTypeForm/:codeItemId',
            hideInMenu: true,
            name: 'dictionaryTypeForm',
            component: './DictionaryType/DictionaryTypeForm'
          }
        ]
      },
      {
        path: '/userOrg',
        icon: 'userOrg',
        name: 'userOrg',
        routes: [
          {
            path: '/userOrg/userOrgList',
            name: 'userOrgList',
            component: './UserOrg/UserOrgList'
          },
          {
            path: '/userOrg/userOrgForm/',
            name: 'userOrgForm',
            component: './UserOrg/UserOrgForm'
          },
          {
            path: '/userOrg/userOrgForm/:userOrgId',
            hideInMenu: true,
            name: 'userOrgForm',
            component: './UserOrg/UserOrgForm'
          }
        ]
      },
      {
        path: '/chatGroup',
        icon: 'chatGroup',
        name: 'chatGroup',
        routes: [
          {
            path: '/chatGroup/chatGroupList',
            name: 'chatGroupList',
            component: './ChatGroup/ChatGroupList'
          },
          {
            path: '/chatGroup/chatGroupForm/',
            name: 'chatGroupForm',
            component: './ChatGroup/ChatGroupForm'
          },
          {
            path: '/chatGroup/chatGroupForm/:groupId',
            hideInMenu: true,
            name: 'chatGroupForm',
            component: './ChatGroup/ChatGroupForm'
          }
        ]
      },
      {
        path: '/workGroupMember',
        icon: 'workGroupMember',
        name: 'workGroupMember',
        routes: [
          {
            path: '/workGroupMember/workGroupMemberList',
            name: 'workGroupMemberList',
            component: './WorkGroupMember/WorkGroupMemberList'
          },
          {
            path: '/workGroupMember/workGroupMemberForm/',
            name: 'workGroupMemberForm',
            component: './WorkGroupMember/WorkGroupMemberForm'
          },
          {
            path: '/workGroupMember/workGroupMemberForm/:memberId',
            hideInMenu: true,
            name: 'workGroupMemberForm',
            component: './WorkGroupMember/WorkGroupMemberForm'
          }
        ]
      },
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/basic-form/:id',
            name: 'basicform',
            hideInMenu:true,
            component: './Forms/BasicForm',
          },
          {
            path: '/form/advanced-form/:id',
            name: 'advancedform',
            component: './Forms/AdvancedForm',
          },
        ]
      }
    ]
  },
];
