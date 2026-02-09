/**
 * Logger personnalisé pour les tests Playwright
 * Formats: INFO, WARN, ERROR, DEBUG avec timestamps
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
}

class Logger {
  private config: LoggerConfig = {
    level: 'INFO',
    enableConsole: true,
    enableFile: false,
  };

  private logLevels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };

  constructor(config?: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
  }

  private getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels[level] >= this.logLevels[this.config.level];
  }

  private formatLog(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.getTimestamp();
    const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${level}] ${message}${dataStr}`;
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('DEBUG')) {
      const log = this.formatLog('DEBUG', message, data);
      if (this.config.enableConsole) console.log(`\x1b[36m${log}\x1b[0m`);
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('INFO')) {
      const log = this.formatLog('INFO', message, data);
      if (this.config.enableConsole) console.log(`\x1b[32m${log}\x1b[0m`);
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('WARN')) {
      const log = this.formatLog('WARN', message, data);
      if (this.config.enableConsole) console.warn(`\x1b[33m${log}\x1b[0m`);
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog('ERROR')) {
      const log = this.formatLog('ERROR', message, error);
      if (this.config.enableConsole) console.error(`\x1b[31m${log}\x1b[0m`);
    }
  }

  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  testStart(testName: string): void {
    this.info(`🧪 TEST STARTED: ${testName}`);
  }

  testEnd(testName: string, status: 'PASSED' | 'FAILED'): void {
    const icon = status === 'PASSED' ? '✅' : '❌';
    this.info(`${icon} TEST ${status}: ${testName}`);
  }

  stepStart(stepName: string): void {
    this.info(`▶️ STEP: ${stepName}`);
  }

  stepEnd(stepName: string): void {
    this.info(`✓ STEP COMPLETED: ${stepName}`);
  }
}

export const logger = new Logger();
export default Logger;
