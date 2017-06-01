# DOUSHIO
![doushio](http://25.media.tumblr.com/tumblr_lr7vliRtmo1r1206jo1_500.jpg)

If you are an avid anime-watcher, you would know that *doushio* is Japanese for 'what should I do?' - which is usually what people tend to ask themselves when they have some free time on the weekend and do not know what to do, other than laze around at home which might seem like a waste. (I also asked myself this question many times over the course of doing this project whenever something was found to be broken.)

Doushio will make things easier for you to find a fulfilling (I hope) activity to spend your time on~ If you're not in the mood to socialize and explore, you can always fall back on your very own list of activities that you can populate to your liking.

BUT WAIT, there's more! Whatever it can do for activities, Doushio can also do FOR FOOD! Now you don't have to look at each other and take turns saying "Where to eat ah?" and "Er anything la you decide".

The app is live [here](http://128.199.214.210/)!

My rails Github repo can be found [here](https://github.com/imouto2005/project-4-rails) as well!

## Development

### ERD

For this time, due to the more complicated and unfamiliar method of building my app, I decided to be kind to myself and keep my ERD simple. So sorry but ain't nobody got time fo joined tables!


### Notable Areas
Honestly...THE WHOLE THING.

### 1. Connecting the front and backend of the app
Because I split my project into 2 repos - frontend and backend, there has to be a way to ensure that data could be passed between the two.

For this, `Axios` would be your best friend. Or you can use `fetch` too, except that it didn't work very well for me. Maybe I am secretly Regina George.

![fetch](https://media1.giphy.com/media/5G98t8QjqBLK8/giphy.gif)

So, how was it done? I used `Axios` to make a `POST` request to my rails app, passing along the user input as data which would go into the params required for creating an activity. Oh and everything you pass has to be in `JSON` or it will not work.

##### React code sample for adding activities
```
addActivity () {
  const newactivity = this.state.activityForm
  localforage.getItem('appName')
  .then((authInfo) => {
    return axios({
      method: 'POST',
      url: 'http://project4backend.herokuapp.com/activities',
      headers: JSON.parse(authInfo),
      data: { data: newactivity }
    })
  }).then((response) => {
    console.log(response)
    this.setState({ activityForm: '' })
    this.fetchActivities()
  })
}
```

##### Rails method in the controller
```
def create
  @activity = Activity.new(description: params[:data])
  @activity.user_id = current_user.id
  @activity.save
end
```

### 2. Calling APIs
TL;DR: You have to do it in Rails.

At this point I had become super comfortable with `Axios` and so I ~~stupidly~~ thought that I could also call APIs in my React app using the same way. I will probably look back on this moment and laugh in a few years.("LOL remember that time I tried to do `process.env` in my React code?!")

Actual conversation that happened:
![api oops](http://i.imgur.com/OzulO7l.png)

SO HOW?
##### React code to send search input to my Rails app for calling Google Places API
```
sendSearchVal() {
  const searchVal = this.state.searchForm
  localforage.getItem('appName')
  .then((authInfo) => {
    const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
    return axios({
      method: 'GET',
      url: 'https://project4backend.herokuapp.com/foods/search',
      headers,
      params: { location: searchVal }
    })
  }).then((response) => {
    this.setState({
      searchForm: '',
      results: response.data.results
    })
  })
}
```

##### API call made in Rails that will send the results back in JSON
```
def location_search
  api_key = ENV['GOOGLE_PLACES_API_KEY']
  location = params[:location]
  response = HTTParty.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+singapore+' + location + '&key=' + api_key)
  body = JSON.parse(response.body)
  render json: body
end
```

### 3. Using React routing to restrict access to private routes
