import type React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ModuleShell, type SubNav } from '../_shared/Layout'
import { useLang } from '../../lib/i18n/Provider'
import SeraDashboard from './screens/Dashboard'
import SeraRegions from './screens/Regions'
import SeraFramework from './screens/Framework'
import SeraReports from './screens/Reports'
import SeraParliament from './screens/Parliament'

export default function SeraRouter(): React.JSX.Element {
  const { t } = useLang()
  const SUBS: SubNav[] = [
    { to: '', label: t('sera.nav.dashboard', 'Dashibodi') },
    { to: 'mikoa', label: t('sera.nav.regions', 'Mikoa') },
    { to: 'mfumo', label: t('sera.nav.framework', 'Mfumo wa Kitaifa') },
    { to: 'ripoti', label: t('sera.nav.reports', 'Ripoti') },
    { to: 'bunge', label: t('sera.nav.parliament', 'Bunge') },
  ]
  return (
    <ModuleShell slug="sera" subs={SUBS}>
      <Routes>
        <Route path="/" element={<SeraDashboard />} />
        <Route path="mikoa" element={<SeraRegions />} />
        <Route path="mfumo" element={<SeraFramework />} />
        <Route path="ripoti" element={<SeraReports />} />
        <Route path="bunge" element={<SeraParliament />} />
      </Routes>
    </ModuleShell>
  )
}
