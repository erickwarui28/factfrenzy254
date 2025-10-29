import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  const post = await reddit.submitCustomPost({
    splash: {
      // Splash Screen Configuration
      appDisplayName: 'Fact Frenzy',
      backgroundUri: 'default-splash.png',
      buttonLabel: 'Start Playing',
      description: 'Test your knowledge in 5 rapid-fire trivia rounds!',
      entryUri: 'index.html',
      heading: '🧠 Fact Frenzy – Think Fast, Redditor!',
      appIconUri: 'default-icon.png',
    },
    postData: {
      gameState: 'initial',
      score: 0,
    },
    subredditName: subredditName,
    title: '🧠 Fact Frenzy - Test Your Knowledge!',
  });

  return post;
};
