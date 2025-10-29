import React from 'react';
import { navigateTo } from '@devvit/web/client';
import { useGameState } from './hooks/useGameState';
import { LoadingSpinner, LoadingPulse } from './components/LoadingSpinner';
import { usePageTransition, useStaggeredAnimation } from './hooks/usePageTransition';
import { PerformanceMonitor } from './components/PerformanceMonitor';

export const App = () => {
  const {
    gameState,
    username,
    loading,
    error,
    currentQuestion,
    currentRound,
    totalRounds,
    score,
    selectedAnswer,
    timeRemaining,
    isCorrect,
    pointsEarned,
    explanation,
    correctAnswer,
    finalScore,
    rank,
    leaderboard,
    startGame,
    selectAnswer,
    playAgain,
  } = useGameState();

  // Page transition management
  const { transitionClass } = usePageTransition({
    currentState: gameState,
    duration: 400,
  });

  // Staggered animations for answer options
  const { visibleItems: visibleAnswers, reset: resetAnswers } = useStaggeredAnimation(
    currentQuestion?.options.length || 0,
    100
  );

  // Reset staggered animations when question changes
  React.useEffect(() => {
    if (gameState === 'question') {
      resetAnswers();
    }
  }, [currentQuestion, resetAnswers]);

  if (loading && gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-textured flex flex-col justify-center items-center mobile-padding state-enter">
        <div className="card-soft-elevated card-mobile p-8 text-center animate-scale-in">
          {/* Animated Snoo with floating effect */}
          <div className="animate-float mb-8">
            <img 
              className="object-contain w-32 h-32 mx-auto" 
              src="/snoo.png" 
              alt="Snoo mascot" 
            />
          </div>
          
          {/* Modern loading spinner */}
          <div className="mb-6">
            <LoadingPulse size="lg" variant="primary" className="mx-auto" />
          </div>
          
          {/* Loading text with animation */}
          <div className="animate-fade-in-delay-2">
            <h2 className="text-heading-3 text-gray-900 font-semibold mb-2">
              Getting Ready
            </h2>
            <p className="text-body text-gray-700">
              Preparing your trivia experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 p-4">
        <img className="object-contain w-1/2 max-w-[250px] mx-auto" src="/snoo.png" alt="Snoo" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (gameState === 'welcome') {
    return (
      <div className={`min-h-screen bg-morph-welcome flex flex-col justify-center items-center mobile-padding relative overflow-hidden ${transitionClass || 'page-fade-enter'}`}>
        {/* Parallax background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200/20 rounded-full parallax-slow" />
          <div className="absolute top-32 right-16 w-16 h-16 bg-success-200/20 rounded-full parallax-medium" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-warning-200/20 rounded-full parallax-fast" />
          <div className="absolute bottom-32 right-10 w-12 h-12 bg-info-200/20 rounded-full parallax-slow" />
        </div>

        {/* Main content card with depth */}
        <div className="card-splash card-mobile w-full text-center animate-scale-in hover-lift relative z-10 depth-layer-1">
          {/* Snoo mascot with bounce animation */}
          <div className="animate-bounce-in-delay-1">
            <img 
              className="object-contain w-32 h-32 mx-auto mb-6" 
              src="/snoo.png" 
              alt="Snoo mascot" 
            />
          </div>
          
          {/* Title with staggered animation */}
          <div className="animate-fade-in-delay-2">
            <h1 className="mobile-heading-scale text-gray-900 mb-3 font-bold">
              🧠 Fact Frenzy
            </h1>
          </div>
          
          {/* Welcome message */}
          <div className="animate-slide-up-delay-2">
            <p className="text-body-large text-gray-700 mb-4">
              {username ? `Hey ${username}! 👋` : 'Welcome!'}
            </p>
          </div>
          
          {/* Description */}
          <div className="animate-slide-up-delay-3">
            <p className="mobile-text-scale text-gray-600 mb-8 leading-relaxed">
              Test your knowledge in 5 rapid-fire trivia rounds!<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>You have 20 seconds per question.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="animate-scale-in-delay-3">
            <button
              className="btn-cta btn-ripple focus-ring disabled:opacity-50"
              onClick={startGame}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="sm" variant="white" />
                  <span>Starting Game...</span>
                </div>
              ) : (
                'Start Game'
              )}
            </button>
          </div>
        </div>
        
        {/* Footer links */}
        <footer className="mt-8 animate-fade-in-delay-3">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600/80">
            <button
              className="link-hover focus-ring-inset rounded touch-zone px-2 py-1"
              onClick={() => navigateTo('https://developers.reddit.com/docs')}
            >
              Docs
            </button>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <button
              className="link-hover focus-ring-inset rounded touch-zone px-2 py-1"
              onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
            >
              r/Devvit
            </button>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <button
              className="link-hover focus-ring-inset rounded touch-zone px-2 py-1"
              onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
            >
              Discord
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // Question Screen
  if (gameState === 'question' && currentQuestion) {
    const timerPercentage = (timeRemaining / 20) * 100;
    
    return (
      <div className={`min-h-screen bg-morph-game flex flex-col mobile-padding relative overflow-hidden ${transitionClass || 'page-slide-left-enter'}`}>
        {/* Subtle parallax elements for depth */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-16 right-8 w-32 h-32 bg-gradient-to-br from-primary-200/10 to-primary-300/10 rounded-full parallax-medium" />
          <div className="absolute bottom-24 left-8 w-24 h-24 bg-gradient-to-br from-info-200/10 to-info-300/10 rounded-full parallax-slow" />
        </div>
        {/* Header Card */}
        <div className="card-soft card-mobile p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-up hover-subtle">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-caption text-gray-600 mb-1 font-semibold">Current Round</span>
              <span className="text-heading-3 text-gray-900 font-bold">
                {currentRound} <span className="text-gray-700 font-semibold">of</span> {totalRounds}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-caption text-gray-600 mb-1 font-semibold">Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-heading-2 text-orange-600 font-bold">{score}</span>
                <span className="text-body-small text-gray-700 font-semibold">pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timer Progress Card */}
        <div className="card-soft card-mobile p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-up hover-subtle" style={{ animationDelay: '0.1s' }}>
          <div className="timer-container h-4 sm:h-5">
            <div
              className={`timer-progress ${
                timerPercentage > 50 
                  ? 'timer-progress-high' 
                  : timerPercentage > 25 
                  ? 'timer-progress-medium' 
                  : 'timer-progress-low'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
          <div className={`timer-text ${
            timeRemaining <= 5 ? 'timer-text-urgent' : 'text-neutral-600'
          }`}>
            {timeRemaining.toFixed(1)}s remaining
          </div>
        </div>

        {/* Question Card */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="card-soft-elevated card-mobile p-6 sm:p-8 mb-6 sm:mb-8 animate-scale-in hover-lift" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-900 text-left leading-relaxed font-semibold">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full max-w-lg mx-auto entrance-cascade">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isDisabled = selectedAnswer !== null;
              const isVisible = visibleAnswers > index;
              
              return (
                <button
                  key={index}
                  className={`answer-button ${isVisible ? 'animate-slide-up' : 'opacity-0'} ${
                    isSelected
                      ? 'answer-button-selected text-white'
                      : isDisabled
                      ? 'answer-button-disabled'
                      : 'text-gray-800 hover:text-gray-900 answer-hover'
                  }`}
                  style={{ 
                    animationDelay: `${0.3 + index * 0.1}s`,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.3s ease-out'
                  }}
                  onClick={() => selectAnswer(index)}
                  disabled={isDisabled}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-base ${
                      isSelected 
                        ? 'bg-white/30 text-white shadow-inner' 
                        : isDisabled
                        ? 'bg-gray-400 text-white'
                        : 'bg-orange-600 text-white shadow-lg'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 mobile-text-scale leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Answer Reveal Screen
  if (gameState === 'reveal' && currentQuestion) {
    return (
      <div className={`min-h-screen bg-morph-reveal flex flex-col justify-center items-center mobile-padding relative overflow-hidden ${transitionClass || 'page-fade-enter'} ${
        isCorrect ? 'celebration-container' : ''
      }`}>
        {/* Confetti particles for correct answers */}
        {isCorrect && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`confetti-particle confetti-particle-${(i % 5) + 1} animate-confetti`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
            
            {/* Sparkle effects */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="sparkle animate-sparkle"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 1.5}s`
                }}
              />
            ))}
          </>
        )}

        {/* Main result card */}
        <div className={`card-soft-elevated card-mobile w-full text-center hover-lift ${
          isCorrect ? 'animate-celebration' : 'animate-scale-in'
        }`}>
          <div className="p-6 sm:p-8">
            {/* Animated Snoo mascot */}
            <div className={`mb-6 ${
              isCorrect ? 'animate-float' : 'animate-bounce-in'
            }`}>
              <img 
                className="object-contain w-24 h-24 mx-auto" 
                src="/snoo.png" 
                alt="Snoo mascot" 
              />
            </div>
            
            {/* Result status with color-coded feedback */}
            <div className="animate-fade-in-delay-1 mb-6">
              <div className={`text-6xl mb-4 ${
                isCorrect 
                  ? 'text-success-500 animate-wiggle' 
                  : 'text-warning-500'
              }`}>
                {isCorrect ? '🎉' : '🤔'}
              </div>
              
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${
                isCorrect ? 'text-green-800' : 'text-orange-800'
              }`}>
                {isCorrect ? 'Excellent!' : 'Not quite right'}
              </h2>
              
              {/* Points earned card */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-body-large font-semibold transition-all duration-base ${
                isCorrect 
                  ? 'bg-green-100 text-green-800 border border-green-200 animate-bounce-in' 
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
              }`} style={{ animationDelay: '0.5s' }}>
                {pointsEarned > 0 ? (
                  <>
                    <span className="text-2xl">+</span>
                    <span>{pointsEarned} points</span>
                  </>
                ) : (
                  <span>No points earned</span>
                )}
              </div>
            </div>

            {/* Explanation card */}
            {explanation && (
              <div className="card-soft p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-body text-gray-800 leading-relaxed">
                  {explanation}
                </p>
              </div>
            )}
            
            {/* Correct answer card */}
            <div className="card-soft bg-primary-50 border-primary-200 p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + correctAnswer!)}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-caption text-orange-800 mb-1 font-bold">Correct Answer</p>
                  <p className="text-body font-bold text-gray-900">
                    {currentQuestion.options[correctAnswer!]}
                  </p>
                </div>
              </div>
            </div>

            {/* Next question timer */}
            <div className="mt-8 animate-fade-in-delay-3">
              <div className="flex items-center justify-center gap-3">
                <LoadingSpinner size="sm" variant="neutral" />
                <div className="text-body-small text-neutral-500">
                  Next question in 3 seconds...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    // Calculate achievement level based on score
    const getAchievementLevel = (score: number) => {
      if (score >= 450) return { level: 'Perfect', emoji: '🏆', color: 'text-warning-500', bgColor: 'bg-warning-50', borderColor: 'border-warning-200' };
      if (score >= 350) return { level: 'Excellent', emoji: '🥇', color: 'text-success-500', bgColor: 'bg-success-50', borderColor: 'border-success-200' };
      if (score >= 250) return { level: 'Great', emoji: '🥈', color: 'text-info-500', bgColor: 'bg-info-50', borderColor: 'border-info-200' };
      if (score >= 150) return { level: 'Good', emoji: '🥉', color: 'text-primary-500', bgColor: 'bg-primary-50', borderColor: 'border-primary-200' };
      return { level: 'Keep Trying', emoji: '💪', color: 'text-neutral-500', bgColor: 'bg-neutral-50', borderColor: 'border-neutral-200' };
    };

    const achievement = getAchievementLevel(finalScore);

    return (
      <div className={`min-h-screen bg-morph-results flex flex-col justify-center items-center mobile-padding relative overflow-hidden ${transitionClass || 'page-fade-enter'}`}>
        {/* Celebratory parallax elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-16 h-16 bg-success-300/20 rounded-full parallax-fast" />
          <div className="absolute top-20 right-12 w-20 h-20 bg-warning-300/20 rounded-full parallax-medium" />
          <div className="absolute bottom-16 left-16 w-12 h-12 bg-primary-300/20 rounded-full parallax-slow" />
          <div className="absolute bottom-8 right-8 w-24 h-24 bg-info-300/20 rounded-full parallax-fast" />
        </div>
        {/* Achievement celebration container */}
        <div className="w-full max-w-2xl mx-auto">
          {/* Main achievement card */}
          <div className="card-soft-elevated card-mobile p-6 sm:p-8 md:p-12 text-center mb-6 sm:mb-8 animate-scale-in hover-lift">
            {/* Animated Snoo mascot */}
            <div className="animate-bounce-in-delay-1 mb-8">
              <img 
                className="object-contain w-32 h-32 mx-auto animate-float" 
                src="/snoo.png" 
                alt="Snoo mascot celebrating" 
              />
            </div>
            
            {/* Game completion message */}
            <div className="animate-fade-in-delay-2 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🎉 Game Complete!
              </h1>
              <p className="mobile-text-scale text-gray-700">
                {username ? `Well done, ${username}!` : 'Congratulations!'} You've completed all 5 rounds.
              </p>
            </div>

            {/* Achievement badge */}
            <div className="animate-scale-in-delay-2 mb-6 sm:mb-8">
              <div className={`inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 rounded-lg border-2 bg-white border-gray-200 shadow-md`}>
                <span className="text-4xl sm:text-6xl animate-wiggle">{achievement.emoji}</span>
                <div className="text-left">
                  <div className="text-caption text-gray-600 mb-1 font-semibold">Achievement</div>
                  <div className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900`}>
                    {achievement.level}
                  </div>
                </div>
              </div>
            </div>

            {/* Play again button */}
            <div className="flex justify-center animate-scale-in-delay-3 mb-6 sm:mb-8" style={{ animationDelay: '0.6s' }}>
              <button
                className="btn-cta btn-ripple hover-glow focus-ring px-8 py-4 text-lg font-bold"
                onClick={playAgain}
              >
                🎮 Play Again
              </button>
            </div>

            {/* Score presentation with visual hierarchy */}
            <div className="animate-slide-up-delay-3 mb-6 sm:mb-8">
              <div className="card-soft bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 p-4 sm:p-8 rounded-2xl sm:rounded-3xl">
                <div className="text-caption text-orange-800 mb-2 font-bold">Final Score</div>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 animate-scale-in-delay-3">
                    {finalScore}
                  </span>
                  <span className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold">points</span>
                </div>
                
                {/* Score breakdown */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{totalRounds}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Questions</div>
                  </div>
                  <div className="text-center border-x border-primary-200">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round((finalScore / (totalRounds * 100)) * 100)}%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(finalScore / totalRounds)}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Avg/Round</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rank display if available */}
            {rank && (
              <div className="animate-fade-in-delay-3 mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-md">
                  <span className="text-3xl">🏆</span>
                  <div className="text-left">
                    <div className="text-caption text-gray-700 mb-1 font-bold">Leaderboard Position</div>
                    <div className="text-heading-3 font-bold text-gray-900">
                      #{rank}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Leaderboard section */}
          {leaderboard.length > 0 && (
            <div className="card-soft card-mobile p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-slide-up hover-subtle" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🏆</span>
                <h3 className="text-heading-3 text-gray-900 font-bold">Leaderboard</h3>
              </div>
              
              <div className="space-y-3">
                {leaderboard.slice(0, 5).map((entry, index) => {
                  const isCurrentUser = entry.username === username;
                  const getRankIcon = (rank: number) => {
                    if (rank === 1) return '🥇';
                    if (rank === 2) return '🥈';
                    if (rank === 3) return '🥉';
                    return '🏅';
                  };

                  return (
                    <div 
                      key={index} 
                      className={`card-soft p-4 flex items-center justify-between card-interactive ${
                        isCurrentUser ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-200' : ''
                      }`}
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getRankIcon(entry.rank)}</span>
                          <span className={`text-body-small font-bold ${
                            isCurrentUser ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            #{entry.rank}
                          </span>
                        </div>
                        <div>
                          <div className={`font-bold ${
                            isCurrentUser ? 'text-orange-800' : 'text-gray-900'
                          }`}>
                            {entry.username}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`text-heading-3 font-bold ${
                        isCurrentUser ? 'text-orange-600' : 'text-gray-800'
                      }`}>
                        {entry.score}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer links */}
        <footer className="mt-12 animate-fade-in-delay-3" style={{ animationDelay: '0.8s' }}>
          <div className="flex gap-4 text-sm text-neutral-600/80">
            <button
              className="link-hover focus-ring-inset rounded px-2 py-1"
              onClick={() => navigateTo('https://developers.reddit.com/docs')}
            >
              Docs
            </button>
            <span className="text-neutral-400">•</span>
            <button
              className="link-hover focus-ring-inset rounded px-2 py-1"
              onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
            >
              r/Devvit
            </button>
            <span className="text-neutral-400">•</span>
            <button
              className="link-hover focus-ring-inset rounded px-2 py-1"
              onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
            >
              Discord
            </button>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <>
      {/* Performance monitoring in development */}
      <PerformanceMonitor />
    </>
  );
};
