// @require 'header.scss'

class head {
  constructor() {
    this.init();
  }

  /**
   * console header
   */
  public init() {
    console.log('header');
    console.log(__uri('./images/egg.svg'))
  }
}
module.exports = new head();