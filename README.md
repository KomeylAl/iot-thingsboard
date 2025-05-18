This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
dashboard
├─ .idea
│  ├─ dashboard.iml
│  ├─ inspectionProfiles
│  │  └─ Project_Default.xml
│  ├─ modules.xml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ actions
│  └─ get-user-info.ts
├─ app
│  ├─ api
│  │  ├─ alarms
│  │  │  └─ route.ts
│  │  ├─ assets
│  │  │  ├─ local
│  │  │  │  └─ route.ts
│  │  │  ├─ profiles
│  │  │  │  ├─ route.ts
│  │  │  │  └─ [id]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     ├─ alarms
│  │  │     │  └─ route.ts
│  │  │     ├─ audits
│  │  │     │  └─ route.ts
│  │  │     ├─ events
│  │  │     │  └─ route.ts
│  │  │     └─ route.ts
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ route.ts
│  │  │  ├─ login.ts
│  │  │  ├─ logout
│  │  │  │  └─ route.ts
│  │  │  ├─ refresh
│  │  │  │  └─ route.ts
│  │  │  └─ user
│  │  │     └─ route.ts
│  │  ├─ customers
│  │  │  ├─ local
│  │  │  │  └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ dashboards
│  │  │  └─ route.ts
│  │  ├─ devices
│  │  │  ├─ local
│  │  │  │  └─ route.ts
│  │  │  ├─ profiles
│  │  │  │  └─ route.ts
│  │  │  ├─ route.ts
│  │  │  ├─ search
│  │  │  │  └─ route.ts
│  │  │  └─ [id]
│  │  │     ├─ alarms
│  │  │     │  └─ route.ts
│  │  │     ├─ audits
│  │  │     │  └─ route.ts
│  │  │     ├─ events
│  │  │     │  └─ route.ts
│  │  │     ├─ route.ts
│  │  │     └─ test-telemtry
│  │  │        └─ route.ts
│  │  ├─ notifications
│  │  │  ├─ count
│  │  │  │  └─ route.ts
│  │  │  ├─ mark
│  │  │  │  └─ route.ts
│  │  │  ├─ mark-single
│  │  │  │  └─ route.ts
│  │  │  ├─ recipients
│  │  │  │  └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ unread
│  │  │     └─ route.ts
│  │  ├─ requests
│  │  │  └─ route.ts
│  │  ├─ rule-chains
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     ├─ metadata
│  │  │     │  └─ route.ts
│  │  │     └─ route.ts
│  │  ├─ socket
│  │  │  └─ route.ts
│  │  ├─ syncronization
│  │  │  ├─ assets
│  │  │  │  └─ route.ts
│  │  │  ├─ customers
│  │  │  │  └─ route.ts
│  │  │  ├─ devices
│  │  │  │  └─ route.ts
│  │  │  ├─ logs
│  │  │  │  └─ route.ts
│  │  │  ├─ profiles
│  │  │  │  └─ tenants
│  │  │  │     └─ route.ts
│  │  │  └─ tenants
│  │  │     ├─ route.ts
│  │  │     └─ [id]
│  │  │        └─ users
│  │  │           └─ route.ts
│  │  ├─ sysadmin
│  │  │  ├─ features-info
│  │  │  │  └─ route.ts
│  │  │  ├─ plans
│  │  │  │  ├─ route.ts
│  │  │  │  ├─ store
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ [id]
│  │  │  │     └─ destroy
│  │  │  │        └─ route.ts
│  │  │  ├─ requests
│  │  │  │  └─ route.ts
│  │  │  ├─ systemInfo
│  │  │  │  └─ route.ts
│  │  │  └─ tenants
│  │  │     ├─ profiles
│  │  │     │  ├─ local
│  │  │     │  │  └─ route.ts
│  │  │     │  ├─ route.ts
│  │  │     │  └─ [id]
│  │  │     │     └─ route.ts
│  │  │     ├─ route.ts
│  │  │     └─ [id]
│  │  │        ├─ devices
│  │  │        │  ├─ local
│  │  │        │  │  └─ route.ts
│  │  │        │  └─ route.ts
│  │  │        ├─ local
│  │  │        │  └─ route.ts
│  │  │        ├─ route.ts
│  │  │        └─ users
│  │  │           ├─ local
│  │  │           │  └─ route.ts
│  │  │           └─ route.ts
│  │  ├─ teemetry
│  │  │  ├─ keys
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ test
│  │  │  ├─ requests
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ token
│  │  │  └─ route.ts
│  │  └─ users
│  │     └─ local
│  │        └─ route.ts
│  ├─ auth
│  │  ├─ layout.tsx
│  │  └─ login
│  │     └─ page.tsx
│  ├─ dashboard
│  │  ├─ alarms
│  │  │  └─ page.tsx
│  │  ├─ assets
│  │  │  ├─ page.tsx
│  │  │  └─ [assetId]
│  │  │     └─ page.tsx
│  │  ├─ customers
│  │  │  └─ page.tsx
│  │  ├─ dashboards
│  │  │  └─ page.tsx
│  │  ├─ devices
│  │  │  ├─ page.tsx
│  │  │  └─ [deviceId]
│  │  │     └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ profiles
│  │  │  ├─ assets
│  │  │  │  └─ page.tsx
│  │  │  └─ devices
│  │  │     └─ page.tsx
│  │  ├─ providers.tsx
│  │  ├─ rule-chains
│  │  │  ├─ page.tsx
│  │  │  └─ [ruleChainId]
│  │  │     └─ page.tsx
│  │  ├─ settings
│  │  │  └─ page.tsx
│  │  └─ _components
│  │     ├─ AddAssetForm.tsx
│  │     ├─ AddAssetProfileForm.tsx
│  │     ├─ AddCustomerForm.tsx
│  │     ├─ AddDevice.tsx
│  │     ├─ AddDeviceProfileForm.tsx
│  │     ├─ AddRuleChainForm.tsx
│  │     ├─ AssetAlarms.tsx
│  │     ├─ AssetAudits.tsx
│  │     ├─ AssetEvents.tsx
│  │     ├─ ConnectionModal.tsx
│  │     ├─ ContextMenu.tsx
│  │     ├─ DeviceAlarms.tsx
│  │     ├─ DeviceAudits.tsx
│  │     ├─ DeviceEvents.tsx
│  │     ├─ DeviceProfileSchema.tsx
│  │     ├─ DeviceTelemetry.tsx
│  │     ├─ EditAssetForm.tsx
│  │     ├─ EditAssetProfileForm.tsx
│  │     ├─ EditCustomerForm.tsx
│  │     ├─ EditDeviceForm.tsx
│  │     ├─ EditRuleChainForm.tsx
│  │     ├─ GraphView.tsx
│  │     ├─ MainRequestList.tsx
│  │     ├─ MainRequestsChart.tsx
│  │     ├─ NodeTable.tsx
│  │     ├─ Teble.tsx
│  │     └─ ui
│  │        ├─ button
│  │        ├─ form
│  │        │  ├─ ChangeRuleChainFor.tsx
│  │        │  ├─ DynamicNodeFrom.tsx
│  │        │  └─ nodeTypes.ts
│  │        └─ input
│  ├─ favicon.ico
│  ├─ globals.css
│  └─ sysadmin
│     ├─ layout.tsx
│     ├─ notifications
│     │  └─ page.tsx
│     ├─ page.tsx
│     ├─ profiles
│     │  └─ page.tsx
│     ├─ providers.tsx
│     ├─ settings
│     │  └─ page.tsx
│     ├─ tenants
│     │  ├─ page.tsx
│     │  └─ [tenantId]
│     │     └─ page.tsx
│     └─ _components
│        ├─ AddPlan.tsx
│        ├─ AddProfileForm.tsx
│        ├─ AddTenant.tsx
│        ├─ AddTenantForm.tsx
│        ├─ AddUserForm.tsx
│        ├─ AllNotis.tsx
│        ├─ DeletePlan.tsx
│        ├─ EditProfileForm.tsx
│        ├─ EditTenantForm.tsx
│        ├─ EntitiesSection.tsx
│        ├─ LastRequests.tsx
│        ├─ NavBar.tsx
│        ├─ NotifRecipients.tsx
│        ├─ RequestChart.tsx
│        ├─ RequestItem.tsx
│        ├─ SideBar.tsx
│        ├─ SystemInfo.tsx
│        ├─ TelemtryChart.tsx
│        ├─ TenantUsers.tsx
│        └─ UnreadNotifs.tsx
├─ components
│  ├─ DeleteModal.tsx
│  ├─ Header.tsx
│  ├─ NavBar.tsx
│  ├─ NotifIcon.tsx
│  ├─ Popup.tsx
│  ├─ SearchBar.tsx
│  ├─ SideBar.tsx
│  ├─ Tabs.tsx
│  ├─ ui
│  │  ├─ accordion.tsx
│  │  ├─ card.tsx
│  │  └─ chart.tsx
│  └─ UnreadNotifsList.tsx
├─ components.json
├─ eslint.config.mjs
├─ hooks
│  ├─ useAlarms.ts
│  ├─ useAssets.ts
│  ├─ useCustomers.ts
│  ├─ useDashboards.ts
│  ├─ useDevices.ts
│  ├─ useModal.ts
│  ├─ useNotifs.ts
│  ├─ usePlans.ts
│  ├─ useProfiles.ts
│  ├─ useRequest.ts
│  ├─ useRequests.ts
│  ├─ useRuleChains.ts
│  ├─ useSync.ts
│  ├─ useSystemInfo.ts
│  ├─ useTelemetry.ts
│  ├─ useTenants.ts
│  ├─ useUser.ts
│  └─ useWebSocket.ts
├─ lib
│  ├─ types.ts
│  └─ utils.ts
├─ middleware.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ migrations
│  │  ├─ 20250129055650_update_tenant_relation
│  │  │  └─ migration.sql
│  │  ├─ 20250129055837_update_tenant_relation
│  │  │  └─ migration.sql
│  │  ├─ 20250129061904_add_tenant_requests_and_plans
│  │  │  └─ migration.sql
│  │  ├─ 20250211135557_add_sync_log
│  │  │  └─ migration.sql
│  │  ├─ 20250212171157_set_null_on_plan_delete
│  │  │  └─ migration.sql
│  │  ├─ 20250223151314_sync_device_schema
│  │  │  └─ migration.sql
│  │  ├─ 20250223191502_make_customer_nullable
│  │  │  └─ migration.sql
│  │  ├─ 20250225191145_added_tenants_phone
│  │  │  └─ migration.sql
│  │  ├─ 20250227070928_users_table_updated
│  │  │  └─ migration.sql
│  │  ├─ 20250301032525_user_tenant_delete_cascade
│  │  │  └─ migration.sql
│  │  ├─ 20250302020430_updated_devices_table
│  │  │  └─ migration.sql
│  │  ├─ 20250303030051_on_delete_actions_added
│  │  │  └─ migration.sql
│  │  ├─ 20250328130949_test_table_added
│  │  │  └─ migration.sql
│  │  ├─ 20250328131023_test_table_updated
│  │  │  └─ migration.sql
│  │  ├─ 20250329021525_test_requests_table_added
│  │  │  └─ migration.sql
│  │  ├─ 20250401101818_asset_table_updated
│  │  │  └─ migration.sql
│  │  ├─ 20250401102444_asset_table_updated2
│  │  │  └─ migration.sql
│  │  ├─ 20250401104119_profiles_table_added
│  │  │  └─ migration.sql
│  │  ├─ 20250401104505_profiles_table_updated
│  │  │  └─ migration.sql
│  │  ├─ 20250414133550_test_request_table_updated
│  │  │  └─ migration.sql
│  │  ├─ 20250426150105_unique_email_deleted_from_tenants_table
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  ├─ schema.prisma
│  └─ seed.ts
├─ public
│  ├─ file.svg
│  ├─ fonts
│  │  └─ sans.ttf
│  ├─ globe.svg
│  ├─ images
│  │  ├─ assets_vector.png
│  │  ├─ device_vector.png
│  │  ├─ login_bg.jpg
│  │  ├─ login_dark_bg.jpg
│  │  ├─ login_light_bg.jpg
│  │  ├─ lotos.png
│  │  └─ plan1.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.ts
├─ tsconfig.json
└─ utils
   ├─ api.ts
   ├─ convert.ts
   ├─ fetchThingsBoardData.ts
   ├─ prisma.ts
   ├─ pusher.ts
   ├─ telemetryWebSooket.tsx
   └─ token.ts

```