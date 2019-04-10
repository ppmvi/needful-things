import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), './.ppmvi.js');
let userConfig;

if (fs.existsSync(filePath)) {
  const file = require(filePath).default;
  userConfig = file.favicons || {};
}

if (userConfig && userConfig.master_picture && userConfig.master_picture.type === 'inline') {
  const image = path.resolve(process.cwd(), userConfig.master_picture.content);
  if (fs.existsSync(image)) {
    userConfig.master_picture.content = fs.readFileSync(image).toString('base64');
  }
}

const defaultConfig = {
  'api_key': '',
  'master_picture': {
    'type': 'url',
    'url': ''
  },
  'files_location': {
    'type': 'path',
    'path': '/static/icons'
  },
  'favicon_design': {
    'desktop_browser': {},
    'ios': {
      'picture_aspect': 'background_and_margin',
      'margin': '8',
      'background_color': '#FFFFFF',
      'assets': {
        'ios6_and_prior_icons': false,
        'ios7_and_later_icons': false,
        'precomposed_icons': false,
        'declare_only_default_icon': true
      }
    },
    'windows': {
      'picture_aspect': 'white_silhouette',
      'background_color': '#FFFFFF',
      'assets': {
        'windows_80_ie_10_tile': true,
        'windows_10_ie_11_edge_tiles': {
          'small': false,
          'medium': true,
          'big': false,
          'rectangle': false
        }
      }
    },
    'android_chrome': {
      'picture_aspect': 'background_and_margin',
      'margin': '12',
      'background_color': '#FFFFFF',
      'theme_color': '#FFFFFF',
      'manifest': {
        'name': 'My sample app',
        'display': 'standalone',
        'orientation': 'portrait',
        'start_url': '/'
      },
      'assets': {
        'legacy_icon': false,
        'low_resolution_icons': false
      }
    },
    'safari_pinned_tab': {
      'picture_aspect': 'black_and_white',
      'threshold': 60,
      'theme_color': '#FFFFFF'
    }
  },
  'settings': {
    'compression': '5',
    'scaling_algorithm': 'Mitchell',
    'error_on_image_too_small': true,
    'readme_file': false,
    'html_code_file': false,
    'use_path_as_is': true
  }
};

export default { ...defaultConfig, ...userConfig };
