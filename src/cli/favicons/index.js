import rfg from 'rfg-api';
import pify from 'pify';
import config from './config';
import ora from 'ora';

export default async function generate(path = './static/icons') {
  const watcherSpinner = ora('Generating Favicons').start();
  const generator = rfg.init();
  
  try {
    await pify(generator.generateFavicon)(config, path);
    watcherSpinner.succeed();
  } catch (err) {
    watcherSpinner.fail(err.message);
  }
}
