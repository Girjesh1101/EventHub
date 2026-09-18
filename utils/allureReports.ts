import * as allure from 'allure-js-commons';
import { Logger } from './logger';
import { execSync } from 'node:child_process';

export async function reportStep<T>(name: string, action: () => Promise<T> | T): Promise<T> {
    return await allure.step(name, async () => await action());
}

interface AllureReportOptions {
    resultDir?: string;
    reportDir?: string;
    singleFile?: boolean;
    clean?: boolean;
}

export function generateAllureReport(options: AllureReportOptions = {}){
    const {
        resultDir = 'allure-results',
        reportDir = 'allure-reports',
        singleFile = true,
        clean = true
    } = options

    const flag = [
        clean ? "--clean" : "",
        singleFile ? "--single-file" : "",
    ].filter(Boolean).join(" ");

    const command = `npx allure generate ${resultDir} -o ${reportDir}`;

    try {
        
        Logger.info(`Generating Allure report ${command}`);
        execSync(command, {stdio: "inherit"});
        Logger.info(`Allure report generated at ${reportDir}`);
    } catch (error) {
        Logger.error(`Allure report generation failed: ${error}`);
    }

}