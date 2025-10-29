import React, { useState, useEffect } from 'react';
import { PerformanceTester, PerformanceTestResults, checkPerformanceBudget } from '../utils/bundleOptimization';
import { AnimationPerformanceMonitor } from '../utils/performance';

interface PerformanceMonitorProps {
  enabled?: boolean;
  showInProduction?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = process.env.NODE_ENV === 'development',
  showInProduction = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<PerformanceTestResults | null>(null);
  const [currentFps, setCurrentFps] = useState(60);
  const [isRunningTest, setIsRunningTest] = useState(false);

  // Don't render in production unless explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  // Don't render if disabled
  if (!enabled) {
    return null;
  }

  useEffect(() => {
    // Start FPS monitoring
    const monitor = new AnimationPerformanceMonitor();
    const unsubscribe = monitor.onFpsUpdate(setCurrentFps);
    monitor.start();

    return () => {
      unsubscribe();
      monitor.stop();
    };
  }, []);

  const runPerformanceTest = async () => {
    setIsRunningTest(true);
    try {
      const tester = new PerformanceTester();
      const results = await tester.runFullTest();
      setTestResults(results);
    } catch (error) {
      console.error('Performance test failed:', error);
    } finally {
      setIsRunningTest(false);
    }
  };

  const getBudgetStatus = () => {
    if (!testResults) return null;
    return checkPerformanceBudget(testResults);
  };

  const budgetStatus = getBudgetStatus();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-neutral-800 text-white p-3 rounded-full shadow-lg hover:bg-neutral-700 transition-colors focus-ring"
        title="Performance Monitor"
        aria-label="Toggle performance monitor"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </button>

      {/* Performance panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 bg-white border border-neutral-200 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900">Performance Monitor</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-neutral-500 hover:text-neutral-700 focus-ring-inset rounded"
              aria-label="Close performance monitor"
            >
              ×
            </button>
          </div>

          {/* Real-time FPS */}
          <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">Current FPS</span>
              <span className={`text-lg font-bold ${
                currentFps >= 50 ? 'text-success-600' : 
                currentFps >= 30 ? 'text-warning-600' : 
                'text-error-600'
              }`}>
                {currentFps}
              </span>
            </div>
            <div className="mt-2 bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentFps >= 50 ? 'bg-success-500' : 
                  currentFps >= 30 ? 'bg-warning-500' : 
                  'bg-error-500'
                }`}
                style={{ width: `${Math.min(currentFps / 60 * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Test button */}
          <button
            onClick={runPerformanceTest}
            disabled={isRunningTest}
            className="w-full mb-4 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
          >
            {isRunningTest ? 'Running Test...' : 'Run Full Performance Test'}
          </button>

          {/* Test results */}
          {testResults && (
            <div className="space-y-3">
              {/* Budget status */}
              {budgetStatus && (
                <div className={`p-3 rounded-lg ${
                  budgetStatus.passed ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
                }`}>
                  <div className={`font-medium ${
                    budgetStatus.passed ? 'text-success-800' : 'text-error-800'
                  }`}>
                    {budgetStatus.passed ? '✅ Performance Budget: PASSED' : '❌ Performance Budget: FAILED'}
                  </div>
                  {!budgetStatus.passed && (
                    <ul className="mt-2 text-sm text-error-700">
                      {budgetStatus.violations.map((violation, index) => (
                        <li key={index} className="mt-1">• {violation}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Bundle size */}
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h4 className="font-medium text-neutral-800 mb-2">Bundle Size</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>CSS:</span>
                    <span>{(testResults.bundleSize.css / 1024).toFixed(2)}KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>JS:</span>
                    <span>{(testResults.bundleSize.js / 1024).toFixed(2)}KB</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Total:</span>
                    <span>{(testResults.bundleSize.total / 1024).toFixed(2)}KB</span>
                  </div>
                </div>
              </div>

              {/* Load time */}
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h4 className="font-medium text-neutral-800 mb-2">Load Time</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>DOM Ready:</span>
                    <span>{testResults.loadTime.domContentLoaded}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fully Loaded:</span>
                    <span>{testResults.loadTime.fullyLoaded}ms</span>
                  </div>
                </div>
              </div>

              {/* Animation performance */}
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h4 className="font-medium text-neutral-800 mb-2">Animation</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Average FPS:</span>
                    <span className={
                      testResults.animation.averageFps >= 50 ? 'text-success-600' : 
                      testResults.animation.averageFps >= 30 ? 'text-warning-600' : 
                      'text-error-600'
                    }>
                      {testResults.animation.averageFps}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frame Drops:</span>
                    <span>{testResults.animation.frameDrops}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jank Score:</span>
                    <span className={
                      testResults.animation.jankScore <= 5 ? 'text-success-600' : 
                      testResults.animation.jankScore <= 15 ? 'text-warning-600' : 
                      'text-error-600'
                    }>
                      {testResults.animation.jankScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Accessibility */}
              <div className="p-3 bg-neutral-50 rounded-lg">
                <h4 className="font-medium text-neutral-800 mb-2">Accessibility</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Contrast Issues:</span>
                    <span className={testResults.accessibility.contrastIssues === 0 ? 'text-success-600' : 'text-error-600'}>
                      {testResults.accessibility.contrastIssues}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focusable Elements:</span>
                    <span>{testResults.accessibility.focusableElements}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ARIA Labels:</span>
                    <span>{testResults.accessibility.ariaLabels}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};