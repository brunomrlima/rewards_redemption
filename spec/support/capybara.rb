require "capybara/rspec"

Capybara.default_driver = :selenium_chrome_headless
Capybara.server = :puma
Capybara.default_max_wait_time = 5
