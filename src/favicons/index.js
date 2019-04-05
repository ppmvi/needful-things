import rfg from 'rfg-api';
import pify from 'pify';
import config from './config';
import ora from 'ora';

export async function generate() {
  const watcherSpinner = ora('Generating Favicons').start();
  const generator = rfg.init();
  
  try {
    await pify(generator.generateFavicon)(config, './icons');
    watcherSpinner.succeed();
  } catch (err) {
    watcherSpinner.fail(err.message);
  }
}
