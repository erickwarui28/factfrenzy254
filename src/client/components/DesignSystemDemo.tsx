/**
 * Design System Demo Component
 * Demonstrates the usage of design system tokens and utilities
 * This is a temporary component for testing - can be removed after implementation
 */

import React from 'react';
import { designTokens, getColor, setTheme, getTheme } from '../styles';

export const DesignSystemDemo: React.FC = () => {
  const currentTheme = getTheme();

  return (
    <div className="p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Design System Demo
        </h1>
        <p className="text-lg text-neutral-600">
          Modern UI Design System for Fact Frenzy
        </p>
      </div>

      {/* Theme Switcher */}
      <div className="card-soft p-6">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Theme Controls</h2>
        <div className="flex gap-3">
          <button
            className={`btn-soft ${currentTheme === 'light' ? 'btn-soft-primary' : 'btn-soft-secondary'}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <button
            className={`btn-soft ${currentTheme === 'dark' ? 'btn-soft-primary' : 'btn-soft-secondary'}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className={`btn-soft ${currentTheme === 'auto' ? 'btn-soft-primary' : 'btn-soft-secondary'}`}
            onClick={() => setTheme('auto')}
          >
            Auto
          </button>
        </div>
      </div>

      {/* Color Palette */}
      <div className="card-soft p-6">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(designTokens.colors).map(([colorName, colorScale]) => (
            <div key={colorName} className="space-y-2">
              <h3 className="text-sm font-medium text-neutral-700 capitalize">{colorName}</h3>
              <div className="space-y-1">
                {Object.entries(colorScale).map(([shade, value]) => (
                  <div
                    key={shade}
                    className="h-8 rounded-md border border-neutral-200 flex items-center justify-center text-xs font-mono"
                    style={{ backgroundColor: value }}
                  >
                    <span className={shade < '400' ? 'text-neutral-800' : 'text-white'}>
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div className="card-soft p-6">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Typography Scale</h2>
        <div className="space-y-4">
          {Object.entries(designTokens.typography.fontSize).map(([size, value]) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-sm font-mono text-neutral-500 w-12">{size}</span>
              <span className="text-sm font-mono text-neutral-400 w-16">{value}</span>
              <span className={`font-medium text-neutral-800`} style={{ fontSize: value }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shadow Examples */}
      <div className="card-soft p-6">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Shadow Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(designTokens.shadows).map(([shadowName, shadowValue]) => (
            <div key={shadowName} className="text-center">
              <div
                className="w-20 h-20 bg-white rounded-lg mx-auto mb-2"
                style={{ boxShadow: shadowValue }}
              />
              <span className="text-sm font-mono text-neutral-600">{shadowName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Examples */}
      <div className="card-soft p-6">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Button Components</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-soft-primary">Primary Button</button>
          <button className="btn-soft-secondary">Secondary Button</button>
          <button className="btn-soft focus-ring">Default Soft Button</button>
          <button className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring">
            Standard Button
          </button>
        </div>
      </div>

      {/* Card Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card-soft p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Soft Card</h3>
          <p className="text-neutral-600">This is a basic soft UI card with subtle shadows.</p>
        </div>
        <div className="card-soft-elevated p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Elevated Card</h3>
          <p className="text-neutral-600">This card has more prominent shadows for emphasis.</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Glass Card</h3>
          <p className="text-neutral-600">This card uses glassmorphism effects.</p>
        </div>
      </div>
    </div>
  );
};