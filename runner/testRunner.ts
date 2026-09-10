import { execSync } from "child_process";

const args = process.argv.slice(2);

const environment = args.find(arg => arg.startsWith('--env='))?.split('=')[1] || 'qa'

const suite = args.find(arg=> arg.startsWith('--suite='))?.split('=')[1] || 'all';

// const browser = args.find(arg=> arg.startsWith('--broswer='))?.split('=')[1] || 'chromium';

console.log(`Environment : ${environment}`);
console.log(`Suite: ${suite}`);

let command  = '';

switch(suite){

    case 'e2e': 
        command = 'npx playwright test tests/e2e.spec.ts';
        break;

    case 'all':
        command = 'npx playwright test tests';
        break;
        
    case 'api':
        command = 'npx playwright test tests/api';  
        break;
        
    default:
        console.error(`Unknown suites: ${suite}`);
        process.exit(1);    
        
}

execSync(command, {
    stdio: 'inherit',
    env: {
        ...process.env,
        ENV: environment
    }
});

