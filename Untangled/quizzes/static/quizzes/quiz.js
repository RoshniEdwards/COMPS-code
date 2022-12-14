console.log('hello world quiz!')
const url = window.location.href

const quizBox = document.getElementById('quiz-box')
const resultBox = document.getElementById('result-box')
//const emptyBox = document.getElementById('empty-box')
const member1a1 = document.getElementById('1a.member1')
const member1a2 = document.getElementById('1a.member2')
const member1a3 = document.getElementById('1a.member3')
const member2a1 = document.getElementById('2a.member1')
const member2a2 = document.getElementById('2a.member2')
const member2a3 = document.getElementById('2a.member3')
const member3a1 = document.getElementById('3a.member1')
const member3a2 = document.getElementById('3a.member2')
const member3a3 = document.getElementById('3a.member3')
const member4a1 = document.getElementById('4a.member1')
const member4a2 = document.getElementById('4a.member2')
const member4a3 = document.getElementById('4a.member3')
const member1b1 = document.getElementById('1b.member1')
const member1b2 = document.getElementById('1b.member2')
const member1b3 = document.getElementById('1b.member3')
const member2b1 = document.getElementById('2b.member1')
const member2b2 = document.getElementById('2b.member2')
const member2b3 = document.getElementById('2b.member3')
const member3b1 = document.getElementById('3b.member1')
const member3b2 = document.getElementById('3b.member2')
const member3b3 = document.getElementById('3b.member3')
const member4b1 = document.getElementById('4b.member1')
const member4b2 = document.getElementById('4b.member2')
const member4b3 = document.getElementById('4b.member3')
const member1c1 = document.getElementById('1c.member1')
const member1c2 = document.getElementById('1c.member2')
const member1c3 = document.getElementById('1c.member3')
const member2c1 = document.getElementById('2c.member1')
const member2c2 = document.getElementById('2c.member2')
const member2c3 = document.getElementById('2c.member3')
const member3c1 = document.getElementById('3c.member1')
const member3c2 = document.getElementById('3c.member2')
const member3c3 = document.getElementById('3c.member3')
const member4c1 = document.getElementById('4c.member1')
const member4c2 = document.getElementById('4c.member2')
const member4c3 = document.getElementById('4c.member3')

$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function(response){
        console.log(response)
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)){
                quizBox.innerHTML += `
                    <hr>
                    <div class="mb-2">
                        <b>${question}</b>
                    </div>
                `
                answers.forEach(answer=>{
                    quizBox.innerHTML += `
                        <div>
                            <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
                            <label for="${question}">${answer}</label>
                        </div>
                    `
                })
            }
        });
    },
    error: function(error){
        console.log(error)
    }
})

const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el=>{
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: data,
        success: function(response){
            quizForm.classList.add('not-visible')
            console.log(response)
            Object.entries(response.scores).map(([key, value]) => {
                console.log({key, value})
                if (value >= 1) {
                    console.log("We have your Hair Type!")
                    //var key = JSON.stringify(key);
                    if (key == "type_1a_score") {
                        console.log("You have Type 1A Hair!")
                        //document.write("Congrats You have Type 1A Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 1A Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Giovanni Tea Tree Triple Treat Invigorating Shampoo
                            </p>
                            <p>
                            - Nexxus Hydra-Light Weightless Moisturizing Conditioner
                            </p>
                            <p>
                            - SexyHair Big Blow Volumizing Gel
                            </p>
                            <p>
                            - Klorane Dry Shampoo
                            </p>
                            <p>
                            - Paul Mitchell Extra-Body Thicken Up Styling Liquid
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member1a1.innerHTML += `
                        <p>
                        Laura
                        </p>
                        <img src="/static/img/1amember1.jpeg"  width="200" height="130" class="member1a1">
                        `
                        member1a2.innerHTML += `
                        <p>
                        Kevin
                        </p>
                        <img src="/static/img/1amember2.jpg"  width="190" height="200" class="member1a2">
                        `
                        member1a3.innerHTML += `
                        <p>
                        Halle
                        </p>
                        <img src="/static/img/1amember3.webp"  width="190" height="200" class="member1a3">
                        `
                    } else if (key == "type_1b_score") {
                        console.log("You have Type 1B Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 1B Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Neutrogena The Anti-Residue Shampoo
                            </p>
                            <p>
                            - dpHUE Apple Cider Vinegar Hair Rinse
                            </p>
                            <p>
                            - OUAI Treatment Mask for Fine and Medium Hair
                            </p>
                            <p>
                            - Pureology Color Fanatic Multi-Tasking Leave-In Spray
                            </p>
                            <p>
                            - Fekkai Full Blown Volume Dry Texturizing Spray
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member1b1.innerHTML += `
                        <p>
                        Amy
                        </p>
                        <img src="/static/img/1bmember1.jpg"  width="200" height="130" class="member1b1">
                        `
                        member1b2.innerHTML += `
                        <p>
                        Jesse
                        </p>
                        <img src="/static/img/1bmember2.webp"  width="260" height="200" class="member1b2">
                        `
                        member1b3.innerHTML += `
                        <p>
                        Emily
                        </p>
                        <img src="/static/img/1bmember3.jpg"  width="190" height="200" class="member1b3">
                        `
                    } else if (key == "type_1c_score") {
                        console.log("You have Type 1C Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 1C Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Function of Beauty Custom Hair Mask
                            </p>
                            <p>
                            - Kiehl’s Silk Groom Serum
                            </p>
                            <p>
                            - Living Proof No Frizz Shampoo
                            </p>
                            <p>
                            - Moroccanoil Smoothing Conditioner
                            </p>
                            <p>
                            - Wet Brush Pro Shine Enhancer Brush
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member1c1.innerHTML += `
                        <p>
                        James
                        </p>
                        <img src="/static/img/1cmember1.jpg"  width="170" height="130" class="member1c1">
                        `
                        member1c2.innerHTML += `
                        <p>
                        Caroline
                        </p>
                        <img src="/static/img/1cmember2.jpg"  width="280" height="200" class="member1c2">
                        `
                        member1c3.innerHTML += `
                        <p>
                        Samir
                        </p>
                        <img src="/static/img/1cmember3.jpg"  width="200" height="220" class="member1c3">
                        `
                    } else if (key == "type_2a_score") {
                        console.log("You have Type 2A Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 2A Hair!<hr> </big>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Monday Haircare Volume Shampoo
                            </p>
                            <p>
                            - DevaCurl One Condition Delight
                            </p>
                            <p>
                            - Ouidad Curl Shaper Memory Maker 3-in-One Revitalizing Milk
                            </p>
                            <p>
                            - Odele Air Dry Styler
                            </p>
                            <p>
                            - Authentic Beauty Concept Amplify Mousse
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member2a1.innerHTML += `
                        <p>
                        Maddy
                        </p>
                        <img src="/static/img/2amember1.jpg"  width="200" height="200" class="member2a1">
                        `
                        member2a2.innerHTML += `
                        <p>
                        Iris
                        </p>
                        <img src="/static/img/2amember2.jpg"  width="200" height="200" class="member2a2">
                        `
                        member2a3.innerHTML += `
                        <p>
                        David
                        </p>
                        <img src="/static/img/2amember3.jpg"  width="190" height="200" class="member2a3">
                        `
                    } else if (key == "type_2b_score") {
                        console.log("You have Type 2B Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 2B Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Redken Frizz Dismiss Sulfate-Free Shampoo
                            </p>
                            <p>
                            - Function of Beauty Custom Leave-In Treatment
                            </p>
                            <p>
                            - Not Your Mother’s Beach Babe Texturizing Sea Salt Spray
                            </p>
                            <p>
                            - Conair Curl Collective Wavy Hair Comb
                            </p>
                            <p>
                            - Turbie Twist Microfiber Hair Towel
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member2b1.innerHTML += `
                        <p>
                        River
                        </p>
                        <img src="/static/img/2bmember1.webp"  width="200" height="200" class="member2b1">
                        `
                        member2b2.innerHTML += `
                        <p>
                        Mia
                        </p>
                        <img src="/static/img/2bmember2.jpg"  width="200" height="200" class="member2b2">
                        `
                        member2b3.innerHTML += `
                        <p>
                        Mike
                        </p>
                        <img src="/static/img/2bmember3.jpg"  width="200" height="200" class="member2b3">
                        `
                    } else if (key == "type_2c_score") {
                        console.log("You have Type 2C Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 2C Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - DevaCurl Buildup Buster Gentle Clarifying Cleanser
                            </p>
                            <p>
                            - Carol’s Daughter Monoi Repairing Conditioner
                            </p>
                            <p>
                            - Briogeo Farewell Frizz Rosehip, Argan, & Coconut Oil Blend
                            </p>
                            <p>
                            - Maui Moisture Heal & Hydrate + Shea Butter Hair Mask
                            </p>
                            <p>
                            - Living Proof No Frizz Leave-In Conditioner
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member2c1.innerHTML += `
                        <p>
                        Kelly
                        </p>
                        <img src="/static/img/2cmember1.webp"  width="200" height="130" class="member2c1">
                        `
                        member2c2.innerHTML += `
                        <p>
                        Amelie
                        </p>
                        <img src="/static/img/2cmember2.jpg"  width="170" height="190" class="member2c2">
                        `
                        member2c3.innerHTML += `
                        <p>
                        Zach
                        </p>
                        <img src="/static/img/2cmember3.jpg"  width="190" height="200" class="member2c3">
                        `
                    } else if (key == "type_3a_score") {
                        console.log("You have Type 3A Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 3A Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - SheaMoisture Restorative Conditioner
                            </p>
                            <p>
                            - Briogeo Curl Charisma Rice Amino + Avocado Leave-In Defining Crème
                            </p>
                            <p>
                            - Herbal Essences Curl-Boosting Mousse
                            </p>
                            <p>
                            - Carol’s Daughter Hair Milk Refresher Spray
                            </p>
                            <p>
                            - Sun Bum Limited Edition T-Shirt Hair Towel
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member3a1.innerHTML += `
                        <p>
                        Sam
                        </p>
                        <img src="/static/img/3amember1.webp"  width="200" height="200" class="member3a1">
                        `
                        member3a2.innerHTML += `
                        <p>
                        Leilani
                        </p>
                        <img src="/static/img/3amember2.jpg"  width="200" height="200" class="member3a2">
                        `
                        member3a3.innerHTML += `
                        <p>
                        Nicole
                        </p>
                        <img src="/static/img/3amember3.jpg"  width="190" height="200" class="member3a3">
                        `
                    } else if (key == "type_3b_score") {
                        console.log("You have Type 3B Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 3B Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Ouidad Curl Quencher Moisturizing Conditioner
                            </p>
                            <p>
                            - DevaCurl Melt Into Moisture Matcha Green Tea Butter Conditioning Mask
                            </p>
                            <p>
                            - Maui Moisture Gentle & Lightweight Flaxseed Curl Defining Mist
                            </p>
                            <p>
                            - Kinky-Curly Knot Today Natural Leave-In Detangler
                            </p>
                            <p>
                            - TRESemmé Flawless Curls Hair Gel
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member3b1.innerHTML += `
                        <p>
                        Lana
                        </p>
                        <img src="/static/img/3bmember1.jpg"  width="200" height="200" class="member3b1">
                        `
                        member3b2.innerHTML += `
                        <p>
                        Daniel
                        </p>
                        <img src="/static/img/3bmember2.jpg"  width="180" height="180" class="member3b2">
                        `
                        member3b3.innerHTML += `
                        <p>
                        Willow
                        </p>
                        <img src="/static/img/3bmember3.jpg"  width="190" height="200" class="member3b3">
                        `
                    } else if (key == "type_3c_score") {
                        console.log("You have Type 3C Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 3C Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Pattern Beauty Medium Conditioner
                            </p>
                            <p>
                            - TPH by Taraji Ride or Die
                            </p>
                            <p>
                            - Ouidad Curl Quencher Hydrafusion Intense Curl Cream
                            </p>
                            <p>
                            - Maui Moisture Heal & Hydrate + Shea Butter Hair Mask
                            </p>
                            <p>
                            - Slip Silk Pillowcase
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member3c1.innerHTML += `
                        <p>
                        Kiara
                        </p>
                        <img src="/static/img/3cmember1.webp"  width="200" height="200" class="member3c1">
                        `
                        member3c2.innerHTML += `
                        <p>
                        Malakai
                        </p>
                        <img src="/static/img/3cmember2.jpg"  width="190" height="200" class="member3c2">
                        `
                        member3c3.innerHTML += `
                        <p>
                        Eleanor
                        </p>
                        <img src="/static/img/3cmember3.jpg"  width="260" height="200" class="member3c3">
                        `
                    } else if (key == "type_4a_score") {
                        console.log("You have Type 4A Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 4A Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Tgin Moisture Rich Sulfate Free Shampoo
                            </p>
                            <p>
                            - Ouidad Coil Infusion Triple Treat Deep Conditioner
                            </p>
                            <p>
                            - Glow by Daye Deep Conditioning Heat Cap
                            </p>
                            <p>
                            - Camille Rose Almond Jai Twisting Butter
                            </p>
                            <p>
                            - Pattern Wide-Tooth Comb
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member4a1.innerHTML += `
                        <p>
                        Amber
                        </p>
                        <img src="/static/img/4amember1.jpg"  width="200" height="200" class="member4a1">
                        `
                        member4a2.innerHTML += `
                        <p>
                        Donovan
                        </p>
                        <img src="/static/img/4amember2.jpg"  width="190" height="200" class="member4a2">
                        `
                        member4a3.innerHTML += `
                        <p>
                        Alyssa
                        </p>
                        <img src="/static/img/4amember3.jpg"  width="190" height="200" class="member4a3">
                        `
                    } else if (key == "type_4b_score") {
                        console.log("You have Type 4B Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 4B Hair </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - Ouidad Coil Infusion Like New Gentle Clarifying Shampoo
                            </p>
                            <p>
                            - Carol’s Daughter Hair Milk Original Leave-In Moisturizer
                            </p>
                            <p>
                            - Mielle Moisture RX Hawaiian Ginger Moisturizing Hair Butter
                            </p>
                            <p>
                            - Aunt Jackie’s Curls & Coils Flaxseed Recipes Don’t Shrink Flaxseed Elongating Curling Gel
                            </p>
                            <p>
                            - Vernon François Sleep-In Silk Cap
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member4b1.innerHTML += `
                        <p>
                        Alana
                        </p>
                        <img src="/static/img/4bmember1.png"  width="200" height="160" class="member4b1">
                        `
                        member4b2.innerHTML += `
                        <p>
                        Dylan
                        </p>
                        <img src="/static/img/4bmember2.webp"  width="190" height="200" class="member4b2">
                        `
                        member4b3.innerHTML += `
                        <p>
                        Jean
                        </p>
                        <img src="/static/img/4bmember3.png"  width="210" height="200" class="member4b3">
                        `
                    } else if (key == "type_4c_score") {
                        console.log("You have Type 2C Hair!")
                        resultBox.innerHTML += `
                        <div>
                            <p> <big> Congrats! You have Type 4C Hair! </big>
                            <hr>
                            </p>
                            <p>
                            Here are some products that might work well for you!
                            </p>
                            <p>
                            - 4C Only Too Thicke Deep Conditioner
                            </p>
                            <p>
                            - Carol’s Daughter Wash Day Delight Sulfate-Free Shampoo With Rose Water
                            </p>
                            <p>
                            - TGIN Miracle RepaiRx Deep Hydrating Hair Mask
                            </p>
                            <p>
                            - The Mane Choice Hair Type 4 Leaf Clover Leave-In Spray
                            </p>
                            <p>
                            - As I Am DoubleButter Cream
                            </p>
                            <hr>
                            <p>
                            And here are some members of our community that have hair like yours!
                            </p>
                            <hr>
                        </div>
                        `
                        member4c1.innerHTML += `
                        <p>
                        Natasha
                        </p>
                        <img src="/static/img/4cmember1.jpeg"  width="200" height="200" class="member4c1">
                        `
                        member4c2.innerHTML += `
                        <p>
                        Liz
                        </p>
                        <img src="/static/img/4cmember2.webp"  width="190" height="200" class="member4c2">
                        `
                        member4c3.innerHTML += `
                        <p>
                        Tessa
                        </p>
                        <img src="/static/img/4cmember3.webp"  width="190" height="200" class="member4c3">
                        `
                    }
                    } //else {
                    //console.log("hiii")
                    //emptyBox.innerHTML += `
                        //<p>
                        //Sorry, you didn't give us enough information to determine your hair type. Refresh the page and take the quiz again to let us help you find your hair type!
                        //</p>
                    //`
                //}
            })
        },
        error: function(error){
            console.log(error)
        }
    })
}

quizForm.addEventListener('submit', e=>{
    e.preventDefault()

    sendData()
})