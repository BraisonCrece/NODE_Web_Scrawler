function main() {
  const baseURL = process.argv.slice(2);
  if(baseURL.length != 1) {
    console.log('ERROR: Only one URL is accepted');
    return
  }

}

main()
