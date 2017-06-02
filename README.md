# DOUSHIO
![doushio](http://25.media.tumblr.com/tumblr_lr7vliRtmo1r1206jo1_500.jpg)

If you are an avid anime-watcher, you would know that *doushio* is Japanese for 'what should I do?' - which is usually what people tend to ask themselves when they have some free time on the weekend and do not know what to do, other than laze around at home which might seem like a waste. (I also asked myself this question many times over the course of doing this project whenever something was found to be broken.)

Doushio will make things easier for you to find a fulfilling (I hope) activity to spend your time on~ If you're not in the mood to socialize and explore, you can always fall back on your very own list of activities that you can populate to your liking.

BUT WAIT, there's more! Whatever it can do for activities, Doushio can also do FOR FOOD! Now you don't have to look at each other and take turns saying "Where to eat ah?" and "Er anything la you decide".

The app is live [here](128.199.214.210)!

My rails Github repo can be found [here](https://github.com/imouto2005/project-4-rails) as well.

## Development

### ERD

For this time, due to the more complicated and unfamiliar method of building my app, I decided to be kind to myself and keep my ERD simple. So sorry but ain't nobody got time fo joined tables!

![ERD](http://i.imgur.com/8BuFGkb.png)

### Notable Areas
Honestly...THE WHOLE THING. It was very challenging for me to switch from doing MVC in one repo to doing MC in one repo and R in another. The React way of doing things was also very new to me and I definitely struggled with that!

![mcr](https://media3.giphy.com/media/w0tItkEcYpqxy/giphy.gif)

#### 1. Connecting the front and backend of the app
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

#### 2. Calling APIs
TL;DR: You have to do it in Rails.

At this point I had become super comfortable with `Axios` and so I ~~stupidly~~ thought that I could also call APIs in my React app using the same way. I will probably look back on this moment and laugh in a few years.("LOL remember that time I tried to do `process.env` in my React code?!")

Actual conversation that happened:
![api oops](http://i.imgur.com/OzulO7l.png)

SO HOW? (Yes you can install a gem for `dotenv` on Rails)
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

#### 3. Using React routing to restrict access to private routes
Initialize state in the constructor:
```
constructor(props) {
  super(props);
  this.state = {
    redirectLogout: false,
    logout: null,
    redirectLogin: false
  }
  this.logout = this.logout.bind(this)
}
```
Update and set the state accordingly after certain actions such as login and logout are performed. Eg:
```
logout () {
  localforage.getItem('appName')
  .then((authInfo) => {
    console.log('logout',authInfo )
    const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
    return axios({
      method: 'DELETE',
      url: 'https://project4backend.herokuapp.com/auth/sign_out',
      headers,
    })
  })
  .then(() => {
    localforage.removeItem('appName')
    console.log('logged out')
    this.setState({
      logout: true,
      redirectLogin: false
    })
  })
  .then(() => {
    this.setState({ redirectLogout: true })
    console.log('redirected')
  })
}
```
Redirect routes according to what the state has been set to. For example, if `logout` is true, it means the user has logged out and should no longer be able to access 'private' routes. So they will be redirected back to the login page if they try to access the private routes by url after they have already logged out.

Here I want to prevent users from accessing the Home page of my app after they have logged out.
```          
<Route exact path='/home' component={() => <Home logout={this.state.logout} /> } />
```
And inside the `render()` in `Home.js`, the redirect will happen according to what the state is.
```
if (this.props.logout) {
  return <Redirect to='/login' />
}
```

### Built and deployed with:
* React JS
* JSX
* CSS
* Ruby on Rails
* PostgreSQL
* Heroku
* NGINX
* Digital Ocean
* [Axios](https://github.com/mzabriskie/axios)
* [HTTParty](https://github.com/jnunemaker/httparty)
* [Local Forage](https://github.com/localForage/localForage)
* [Devise Token Auth](https://github.com/lynndylanhurley/devise_token_auth)
* [Meetup.com API](https://www.meetup.com/meetup_api/)
* [Google Places API](https://developers.google.com/places/)

### Limitations & Room for improvement
* API results were not adequate eg. No images, no date and time (it was in a funny string of numbers)

I wanted to do all of these but I had no time :<
* Flash messages
* Google Maps API
* Machine Learning recommender system

## Acknowledgments
This project would have been a complete disaster without the help from the following people. I AM SORRY FOR DISTURBING ALL OF YOU :(
* [Siaw Young](https://github.com/siawyoung) - For helping me at every step of the way not just for this project but the entire course as well. For helping to debug my code over Telegram in the middle of the night and all those Screenhero sessions to fix my code :sweat_smile: For coming to my house and staying till 1am to help fix my mysterious deployment disaster.
* [Tom](https://github.com/dorkblue) - For being so patient with all my annoying questions and always helping me even while being swamped by projects.
* [Yi Sheng](https://github.com/yisheng90) & [Sharona](https://github.com/sharona1610) - My awesome TAs who were also so patient with me and helped me to resolve all my issues/broken things/Heroku deployment troubles.
* [Kenneth](https://github.com/DarkArtistry) - For the additional input while we were trying to deploy to Heroku :joy:
* [Bao Ling](https://github.com/cocokoh) - For the tips on Google Places API!
* [Darrell](https://github.com/darrelltzj) - For being the inspiration behind putting in a randomly generated element. IT IS REALLY RANDOM NOW ok.
* And everyone else in my class for humouring me and making this whole experience a lot less painful than it could have been :grin:
