/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import DocsPage from './pages/DocsPage';
import ArduinoLibraryDocsPage from './pages/ArduinoLibraryDocsPage';

export default function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"                     element={<LandingPage />} />
        {/* Legacy Voice AI developer docs — not in the navbar, linked from the footer only */}
        <Route path="/docs"                 element={<DocsPage />} />
        <Route path="/docs/arduino-library" element={<ArduinoLibraryDocsPage />} />
        {/* Retired pages: send old links to the homepage */}
        <Route path="/autopilot"            element={<Navigate to="/" replace />} />
        <Route path="/about"                element={<Navigate to="/" replace />} />
        <Route path="*"                     element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
