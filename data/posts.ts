import { BlogPost, Category } from '../types';

export const posts: BlogPost[] = [
  // Tech News Posts
  {
    id: '1',
    slug: 'future-of-ai-2024',
    title: 'The Future of AI in 2024: What to Expect',
    category: 'Tech News',
    date: '2023-10-25',
    author: 'Alex Tech',
    tags: ['AI', 'Future', 'Trends'],
    summary: 'Artificial Intelligence is evolving rapidly. Here is a simple breakdown of the biggest trends coming next year.',
    content: `
      <p>Artificial Intelligence (AI) is no longer just a buzzword; it is part of our daily lives. From smart assistants like Siri to powerful tools like ChatGPT, AI is changing how we work and play.</p>
      <h3>1. Personalized Assistants</h3>
      <p>In 2024, expect AI assistants to become much smarter. Instead of just setting alarms, they will help you plan your week, draft emails, and even shop for groceries based on your diet.</p>
      <h3>2. AI in Healthcare</h3>
      <p>Doctors are starting to use AI to detect diseases earlier than ever before. This doesn't mean robots are replacing doctors, but they are giving them superpowers to diagnose better.</p>
      <h3>Conclusion</h3>
      <p>The future is bright, but it's important to stay informed. Technology moves fast, and we are here to make sure you understand it without the confusing jargon.</p>
    `
  },
  {
    id: '2',
    slug: 'smartphone-battery-breakthrough',
    title: 'New Smartphone Battery Tech Lasts 3 Days',
    category: 'Tech News',
    date: '2023-10-22',
    author: 'Sarah Circuits',
    tags: ['Mobile', 'Hardware', 'Innovation'],
    summary: 'Tired of charging your phone every night? A new breakthrough in battery technology might change that forever.',
    content: `
      <p>We all know the struggle: it's 2 PM and your phone is already at 20%. Thankfully, scientists have developed a new type of solid-state battery that is safer and holds much more energy.</p>
      <h3>Why Solid-State?</h3>
      <p>Traditional batteries use liquid inside, which can get hot and degrade over time. Solid-state batteries use solid materials, making them thinner, lighter, and capable of lasting days on a single charge.</p>
      <p>Expect to see these in flagship phones within the next 18 months.</p>
    `
  },
  {
    id: '3',
    slug: 'cybersecurity-basics',
    title: '5 Simple Tips to Stay Safe Online',
    category: 'Tech News',
    date: '2023-10-20',
    author: 'Mike Security',
    tags: ['Security', 'Privacy', 'Tips'],
    summary: 'Hackers are getting smarter. Here are 5 incredibly simple things you can do today to protect your data.',
    content: `
      <p>Security doesn't have to be complicated. You don't need to be a coder to be safe.</p>
      <ol>
        <li><strong>Use a Password Manager:</strong> Stop using "Password123". Tools like LastPass or 1Password create complex passwords for you.</li>
        <li><strong>Turn on 2FA:</strong> Two-Factor Authentication means even if someone steals your password, they can't get in without your phone.</li>
        <li><strong>Update Your Software:</strong> Updates often include security fixes. Don't click "Remind me later" forever!</li>
      </ol>
    `
  },
  // Finance Basics Posts
  {
    id: '4',
    slug: 'compound-interest-explained',
    title: 'Compound Interest: The 8th Wonder of the World',
    category: 'Finance Basics',
    date: '2023-10-24',
    author: 'Jane Finance',
    tags: ['Investing', 'Savings', 'Wealth'],
    summary: 'Learn how saving small amounts today can turn into millions by the time you retire, thanks to compound interest.',
    content: `
      <p>Albert Einstein reportedly called compound interest the "eighth wonder of the world". But what is it?</p>
      <h3>Simple vs. Compound</h3>
      <p>Simple interest is earning money only on what you deposit. Compound interest is earning money on your deposit AND on the interest you've already earned.</p>
      <h3>The Snowball Effect</h3>
      <p>Imagine a snowball rolling down a hill. It starts small, but as it rolls, it picks up more snow and gets bigger faster. That is your money with compound interest. The key ingredient is <em>time</em>.</p>
      <p>Start saving early, even if it's just $50 a month!</p>
    `
  },
  {
    id: '5',
    slug: 'budgeting-50-30-20',
    title: 'The 50/30/20 Rule: Budgeting Made Easy',
    category: 'Finance Basics',
    date: '2023-10-18',
    author: 'Tom Saver',
    tags: ['Budgeting', 'Savings', 'Tips'],
    summary: 'Struggling to manage your paycheck? This simple rule splits your money into Needs, Wants, and Savings.',
    content: `
      <p>Budgeting is often boring, but it's necessary. The 50/30/20 rule is a simple framework to keep your finances on track without complex spreadsheets.</p>
      <ul>
        <li><strong>50% Needs:</strong> Rent, groceries, utilities, transportation. These are non-negotiable.</li>
        <li><strong>30% Wants:</strong> Dining out, Netflix, hobbies, new clothes. This is the fun stuff!</li>
        <li><strong>20% Savings:</strong> Emergency fund, retirement, debt repayment. This pays your future self.</li>
      </ul>
      <p>Try it next month and see how much stress it saves you.</p>
    `
  },
  {
    id: '6',
    slug: 'stocks-vs-bonds',
    title: 'Stocks vs. Bonds: What is the Difference?',
    category: 'Finance Basics',
    date: '2023-10-15',
    author: 'Jane Finance',
    tags: ['Investing', 'Stocks', 'Bonds'],
    summary: 'Investing confuses many beginners. We break down the two main building blocks of a portfolio.',
    content: `
      <p>When you open an investment account, you often hear about stocks and bonds. Here is the simplest way to understand them:</p>
      <h3>Stocks = Ownership</h3>
      <p>When you buy a stock, you buy a tiny piece of a company. If the company does well, your stock goes up. It's riskier, but offers higher potential returns.</p>
      <h3>Bonds = Loaning Money</h3>
      <p>When you buy a bond, you are loaning money to a government or company. They pay you back with interest. It is generally safer than stocks, but the returns are lower.</p>
      <p>Most experts recommend having a mix of both.</p>
    `
  }
];

export const getLatestPosts = (count: number = 3) => {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
};

export const getPostsByCategory = (category: Category) => {
  return posts.filter(post => post.category === category);
};

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost, count: number = 3): BlogPost[] => {
  return posts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      let score = 0;
      // Primary matching: Same category
      if (post.category === currentPost.category) score += 5;
      
      // Secondary matching: Shared tags
      if (currentPost.tags && post.tags) {
        const sharedTags = post.tags.filter(tag => currentPost.tags!.includes(tag));
        score += sharedTags.length * 2;
      }

      return { post, score };
    })
    .filter(item => item.score > 0) // Only return items with some relevance
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, count)
    .map(item => item.post);
};