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
    authority: ['ROOT'],
    routes: [
      {path: '/', redirect: '/user/userList'},
      {
        path: '/user',
        icon: 'usergroup-add',
        name: 'user',
        routes: [
          {
            // 临时处理
            path: '/user/login',
            redirect: '/access/login'
          },
          {
            path: '/user/userList',
            name: 'userList',
            authority: ['ROOT'],
            component: './User/UserList'
          },
          {
            path: '/user/userForm/',
            name: 'userForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './User/UserForm'
          },
          {
            path: '/user/userForm/:userId',
            hideInMenu: true,
            name: 'userForm',
            authority: ['ROOT'],
            component: './User/UserForm'
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
            authority: ['ROOT'],
            component: './Organization/OrganizationList'
          },
          {
            path: '/organization/organizationForm/',
            name: 'organizationForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './Organization/OrganizationForm'
          },
          {
            path: '/organization/organizationForm/:orgId',
            hideInMenu: true,
            name: 'organizationForm',
            authority: ['ROOT'],
            component: './Organization/OrganizationForm'
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
            authority: ['ROOT'],
            component: './UserOrg/UserOrgList'
          },
          {
            path: '/userOrg/userOrgForm/',
            name: 'userOrgForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './UserOrg/UserOrgForm'
          },
          {
            path: '/userOrg/userOrgForm/:userOrgId',
            hideInMenu: true,
            name: 'userOrgForm',
            authority: ['ROOT'],
            component: './UserOrg/UserOrgForm'
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
            authority: ['ROOT'],
            component: './Auth/AuthList'
          },
          {
            path: '/auth/authForm/',
            name: 'authForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './Auth/AuthForm'
          },
          {
            path: '/auth/authForm/:authId',
            hideInMenu: true,
            name: 'authForm',
            authority: ['ROOT'],
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
            authority: ['ROOT'],
            component: './Role/RoleList'
          },
          {
            path: '/role/roleForm/',
            name: 'roleForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './Role/RoleForm'
          },
          {
            path: '/role/roleForm/:roleId',
            hideInMenu: true,
            name: 'roleForm',
            authority: ['ROOT'],
            component: './Role/RoleForm'
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
            authority: ['ROOT'],
            component: './Routine/RoutineList'
          },
          {
            path: '/routine/routineForm/',
            name: 'routineForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './Routine/RoutineForm'
          },
          {
            path: '/routine/routineForm/:routineId',
            hideInMenu: true,
            name: 'routineForm',
            authority: ['ROOT'],
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
            authority: ['ROOT'],
            component: './Dictionary/DictionaryList'
          },
          {
            path: '/dictionary/dictionaryForm/',
            name: 'dictionaryForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './Dictionary/DictionaryForm'
          },
          {
            path: '/dictionary/dictionaryForm/:dictionaryId',
            hideInMenu: true,
            name: 'dictionaryForm',
            authority: ['ROOT'],
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
            authority: ['ROOT'],
            component: './DictionaryType/DictionaryTypeList'
          },
          {
            path: '/dictionaryType/dictionaryTypeForm/',
            name: 'dictionaryTypeForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './DictionaryType/DictionaryTypeForm'
          },
          {
            path: '/dictionaryType/dictionaryTypeForm/:codeItemId',
            hideInMenu: true,
            name: 'dictionaryTypeForm',
            authority: ['ROOT'],
            component: './DictionaryType/DictionaryTypeForm'
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
            authority: ['ROOT'],
            component: './ChatGroup/ChatGroupList'
          },
          {
            path: '/chatGroup/chatGroupForm/',
            name: 'chatGroupForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './ChatGroup/ChatGroupForm'
          },
          {
            path: '/chatGroup/chatGroupForm/:groupId',
            hideInMenu: true,
            name: 'chatGroupForm',
            authority: ['ROOT'],
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
            authority: ['ROOT'],
            component: './WorkGroupMember/WorkGroupMemberList'
          },
          {
            path: '/workGroupMember/workGroupMemberForm/',
            name: 'workGroupMemberForm',
            hideInMenu: true,
            authority: ['ROOT'],
            component: './WorkGroupMember/WorkGroupMemberForm'
          },
          {
            path: '/workGroupMember/workGroupMemberForm/:memberId',
            hideInMenu: true,
            name: 'workGroupMemberForm',
            authority: ['ROOT'],
            component: './WorkGroupMember/WorkGroupMemberForm'
          }
        ]
      },
      {
        path: '/userLoginLog',
        icon: 'userLoginLog',
        name: 'userLoginLog',
        routes: [
          {
            path: '/userLoginLog/userLoginLogList',
            name: 'userLoginLogList',
            authority: ['ROOT'],
            component: './UserLoginLog/UserLoginLogList'
          }
        ]
      },
      {
        path: '/file',
        icon: 'file',
        name: 'file',
        routes: [
          {
            path: '/file/fileList',
            name: 'fileList',
            authority: ['ROOT'],
            component: './File/FileList'
          }
        ]
      },
      {
        path: '/account',
        icon: 'user',
        name: 'personal',
        authority: ['ROOT'],
        component: './Account/Settings/Info',
        routes: [
          {
            path: '/account/base',
            name: 'base',
            authority: ['ROOT'],
            component: './Account/Settings/BaseView'
          }
        ]
      }
    ]
  },
];
