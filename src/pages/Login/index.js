import "./login.css"

function Login()
{
    return(
        <div class="login-screen">
            <div class="title">Login</div>
            <form>
                <div class="form-group">
                    <label class="label" for="username">Username:</label>
                    <input class="input" type="text" id="username" name="username" required/>
                </div>
                <div class="form-group">
                    <label class="label" for="password">Password:</label>
                    <input class="input" type="password" id="password" name="password" required/>
                </div>
                <button class="button" type="submit">Login</button>
            </form>
        </div>
    ); 
}

export default Login;