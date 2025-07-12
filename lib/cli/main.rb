require "thor"
require "httparty"

module CLI
  class Main < Thor
    BASE_URL = ENV.fetch("API_BASE_URL", "http://localhost:3000/api/v1")

    desc "rewards", "List all available rewards"
    def rewards
      response = HTTParty.get("#{BASE_URL}/rewards", headers: { Accept: "application/json" })

      handle_response(response)
    end

    desc "redemptions", "List all redemptions for a user"
    def redemptions
      response = HTTParty.get(
        "#{BASE_URL}/redemptions",
        query: { user_id: User.last&.id },
        headers: { Accept: "application/json" }
      )

      handle_response(response)
    end

    desc "redeem USER_ID REWARD_ID", "Redeem a reward for a user"
    def redeem(reward_id)
      response = HTTParty.post(
        "#{BASE_URL}/redemptions",
        body: { user_id: User.last&.id, redemption: { reward_id: reward_id } }.to_json,
        headers: {
          "Content-Type" => "application/json",
          Accept: "application/json"
        }
      )

      handle_response(response)
    end

    private

    def handle_response(response)
      if response.success?
        puts JSON.pretty_generate(JSON.parse(response.body))
      else
        puts "Error (#{response.code}):"
        begin
          parsed = JSON.parse(response.body)

          if parsed["errors"].is_a?(Array)
            parsed["errors"].each { |msg| puts "- #{msg}" }
          elsif parsed["error"].is_a?(String)
            puts "- #{parsed['error']}"
          else
            puts JSON.pretty_generate(parsed)
          end
        rescue JSON::ParserError
          puts response.body
        end
        exit(1)
      end
    end
  end
end
