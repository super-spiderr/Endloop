import data from '../data/roasts.json';
import { RoastTier, RoastStyle, RoastContext } from '../types/roast';

interface RoastDataStructure {
  [style: string]: {
    [tier: string]: {
      [time: string]: string[];
    };
  };
}

const roastsData = data as RoastDataStructure;

export class RoastEngine {
  static getTier(minutesOver: number): RoastTier {
    if (minutesOver < 30) {
      return 'nudge';
    }
    if (minutesOver < 90) {
      return 'roast';
    }
    if (minutesOver < 180) {
      return 'savage';
    }
    return 'intervention';
  }

  static getTimeOfDay(): 'morning' | 'afternoon' | 'night' {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'morning';
    }
    if (hour < 18) {
      return 'afternoon';
    }
    return 'night';
  }

  static generateRoast(ctx: RoastContext, style: RoastStyle = 'savage'): string {
    const tier = this.getTier(ctx.minutesOver);
    const timeOfDay = this.getTimeOfDay();

    // Priority 1: Streak breaking roast
    if (ctx.currentStreak > 3 && ctx.minutesOver > 0) {
      return this.getStreakBreakRoast(ctx);
    }
    
    // Priority 2: Repeat offender roast (3 days in a row)
    if (ctx.isRepeatOffender) {
      return this.getRepeatOffenderRoast(ctx);
    }

    // Generic pool based on style and situation
    const stylePool = roastsData[style] || roastsData.savage;
    const tierPool = stylePool[tier] || stylePool.roast || roastsData.savage.roast;
    const pool = tierPool[timeOfDay] || tierPool.general || roastsData.savage.roast.general;

    if (!Array.isArray(pool) || pool.length === 0) {
      return `You've spent ${ctx.minutesOver} minutes over your limit on ${ctx.appName}.`;
    }

    const template = pool[Math.floor(Math.random() * pool.length)];
    return this.interpolate(template, ctx);
  }

  private static getStreakBreakRoast(ctx: RoastContext): string {
    const templates = [
      `${ctx.currentStreak} days clean. Then ${ctx.appName} happened. Incredible.`,
      `You were on a ${ctx.currentStreak}-day streak. ${ctx.appName} says hi.`,
      `${ctx.currentStreak} days of discipline, undone by ${ctx.appName}. Respect the chaos.`,
      `The ${ctx.currentStreak}-day walls just crumbled. ${ctx.appName} is the wreckage.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private static getRepeatOffenderRoast(ctx: RoastContext): string {
    const templates = [
      `${ctx.appName} again? This is day 3. It has a name for you now.`,
      `You and ${ctx.appName}. Third day in a row. That's a relationship.`,
      `Day 3 of ${ctx.appName}. You're not a user, you're a resident.`,
      `Consistency is key, but maybe not on ${ctx.appName} for 3 days straight.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private static interpolate(template: string, ctx: RoastContext): string {
    return template
      .replaceAll('{app}', ctx.appName)
      .replaceAll('{minutes}', String(ctx.minutesOver))
      .replaceAll('{total}', String(ctx.totalMinutesToday))
      .replaceAll('{streak}', String(ctx.currentStreak));
  }
}
