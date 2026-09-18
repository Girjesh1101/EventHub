import { generateAllureReport } from "../utils/allureReports";

export default async function globalTearDown(): Promise<void> {
    generateAllureReport({singleFile: true});
}