import { promises as fs } from 'fs';
import path from 'path';

export interface Newsletter {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node: {
      name: string;
    };
  };
  content?: string;
  htmlPath?: string;
}

export class NewsletterService {
  private static instance: NewsletterService;
  private newsletters: Newsletter[] = [];

  static getInstance(): NewsletterService {
    if (!NewsletterService.instance) {
      NewsletterService.instance = new NewsletterService();
    }
    return NewsletterService.instance;
  }

  async loadNewsletters(): Promise<Newsletter[]> {
    try {
      const dataPath = path.join(process.cwd(), 'src/data/newsletters.json');
      const fileContents = await fs.readFile(dataPath, 'utf8');
      const newsletters = JSON.parse(fileContents) as Newsletter[];

      const htmlDir = path.join(process.cwd(), 'public/newsletters');

      for (const newsletter of newsletters) {
        const htmlPath = path.join(htmlDir, `${newsletter.slug}.html`);
        try {
          await fs.access(htmlPath);
          newsletter.htmlPath = `/newsletters/${newsletter.slug}.html`;
        } catch {
          // HTML file for newsletter is optional
        }
      }

      this.newsletters = newsletters;
      return newsletters;
    } catch (error) {
      console.error('Error loading newsletters:', error);
      return [];
    }
  }

  async getNewsletter(slug: string): Promise<Newsletter | null> {
    if (this.newsletters.length === 0) {
      await this.loadNewsletters();
    }
    return this.newsletters.find((n) => n.slug === slug) || null;
  }

  async getAllNewsletters(): Promise<Newsletter[]> {
    if (this.newsletters.length === 0) {
      await this.loadNewsletters();
    }
    return this.newsletters;
  }

  async getNewsletterContent(newsletter: Newsletter): Promise<string> {
    if (newsletter.htmlPath) {
      try {
        const htmlPath = path.join(
          process.cwd(),
          'public',
          newsletter.htmlPath
        );
        return await fs.readFile(htmlPath, 'utf8');
      } catch (error) {
        console.error('Error reading HTML file:', error);
      }
    }
    return newsletter.content || '';
  }
}
