import { rmSync } from 'node:fs';
import * as allure from 'allure-js-commons';
import { Logger } from './logger';
import { execSync } from 'node:child_process';

export async function reportStep<T>(name: string, action: () => Promise<T> | T): Promise<T> {
    return await allure.step(name, async () => await action());
}

interface AllureReportOptions {
    resultDir?: string;
    reportDir?: string;
    openAfterGenerate?: boolean;
}

export function generateAllureReport(options: AllureReportOptions = {}): void {
    const {
        resultDir = 'allure-results',
        reportDir = 'allure-report',
        openAfterGenerate = !process.env.CI,
    } = options;

    try {
        rmSync(reportDir, { recursive: true, force: true });
    } catch (error) {
        Logger.error(`Failed to clear ${reportDir}: ${error}`);
    }

    const openFlag = openAfterGenerate ? '--open' : '';
    const command = `npx allure generate ${resultDir} --output ${reportDir} ${openFlag}`.trim();

    try {
        Logger.info(`Generating Allure report: ${command}`);
        execSync(command, { stdio: 'inherit' });
        Logger.info(`Allure report generated at ${reportDir}`);
    } catch (error) {
        Logger.error(`Allure report generation failed: ${error}`);
    }
}