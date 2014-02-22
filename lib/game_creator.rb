require 'unirest'

class Client
  def list_posts()
    response = Unirest.get('https://mksbingo.firebaseio.com/board.json',
      headers: { "Accept" => "application/json" })
    posts = response.body
    if response.code == 200
      posts.each do |post|
        # your code goes here!
        puts post
      end
    else
      puts "Warning! There was an error with code #{response.code}"
    end
  end

  def show_post(id)
    url = 'http://makerblog.herokuapp.com/posts/' + id.to_s

    response = Unirest.get(url, headers: { "Accept" => "application/json"})
    if response.code == 200
      post = response.body
      post.each {|x,y| puts "#{x}: #{y}"}
    else
      puts "Warning! There was an error with code #{response.code}"
    end

  end

  def create_post(name, title, content)
    url = 'http://makerblog.herokuapp.com/posts'
    payload = {:post => {'name' => name, 'title' => title, 'content' => content}}

    response = Unirest.post(url,
      headers: {
        "Content-Type" => "application/json" },
        parameters: payload)
    if response.code == 201
      post = response.body
      post.each {|x,y| puts "#{x}: #{y}"}
    else
      puts "Warning! There was an error with code #{response.code}"
    end
  end

  def edit_post(id, options = {})
    url = 'http://makerblog.herokuapp.com/posts/' + id.to_s
    params = {}

    # can't figure this part out? Google "ruby options hash"
    params[:name] = options[:name] unless options[:name].nil?
    params[:title] = options[:title] unless options[:title].nil?
    params[:content] = options[:content] unless options[:content].nil?

    response = Unirest.put(url,
      parameters: { :post => params },
      headers: { "Accept" => "application/json",
                 "Content-Type" => "application/json" })

    if response.code == 200
      post = response.body
      post.each {|x,y| puts "#{x}: #{y}"}
    else
      puts "Warning! There was an error with code #{response.code}"
    end


    # you know the drill, convert the response and display the result nicely
  end

  def delete_post(id)
    url = 'http://makerblog.herokuapp.com/posts/' + id.to_s
    response = Unirest.delete(url,
      headers: { "Accept" => "application/json" })

    if response.code == 204
      puts "Content successfully deleted"
    else
      puts "Warning! There was an error with code #{response.code}"
    end
  end

  def get_head(id)
    url = 'http://makerblog.herokuapp.com/posts/' + id.to_s
    response = Unirest.get(url,
      headers: { "Accept" => "application/json" })

    if response.code == 200
      head = response.headers
      head.each {|x,y| puts "#{x}: #{y}"}
    else
      puts "Warning! There was an error with code #{response.code}"
    end
  end

  def patch_post(id, options = {})
    url = 'http://makerblog.herokuapp.com/posts/' + id.to_s
    params = {}

    # can't figure this part out? Google "ruby options hash"
    params[:name] = options[:name] unless options[:name].nil?
    params[:title] = options[:title] unless options[:title].nil?
    params[:content] = options[:content] unless options[:content].nil?

    response = Unirest.patch(url,
      parameters: { :post => params },
      headers: { "Accept" => "application/json",
                 "Content-Type" => "application/json" })

    if response.code == 200
      post = response.body
      post.each {|x,y| puts "#{x}: #{y}"}
    else
      puts "Warning! There was an error with code #{response.code}"
    end
  end
end

client = Client.new
client.list_posts

class Game_Board


  def self.randomizer()
    game_arr = []
    copy = []
    for i in 0..24 do
      game_arr << i
      copy << i
    end
    rand_arr = []
    while rand_arr.length() < 25
      x=rand(copy.length)
      rand_arr << copy[x]
      copy.delete_at(x)
    end
    return [rand_arr, game_arr]
  end
end
