# Metronome

## Development Requirements

- [Homebrew](http://brew.sh/)
- Current Node.js via Homebrew: `brew install node`
- Watchman: `brew install watchman`
- [yarn](https://yarnpkg.com/) ... (or npm, but yarn tends to be more pleasant)
- React Native CLI via yarn: `yarn global add react-native-cli`

### for iOS

XCode dev tools must be initialized.  If you've already been tinkering with iOS dev, this is _probably_ all set.  More details on the [react-native site](https://facebook.github.io/react-native/docs/getting-started).

### for Android

There's a little more to do to get Android up and running.  See again the [react-native site](https://facebook.github.io/react-native/docs/getting-started#java-development-kit): start at the *Java Development Kit* section and go until the *Creating a new application* section.

If you just want to see the app run, you can forget about Android till later and simply stick with iOS for now.

## Running

Run the following in this directory (the project root):  
- `react-native run-ios`
- `react-native run-android`
