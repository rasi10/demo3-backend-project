import * as clientHelpers from '../helpers/clientHelpers'


describe('testing auth', function(){
    it ('test case 1', function(){
        cy.authenticateSession().then((response =>{
            cy.request({
                method: "GET",
                url: 'http://localhost:3000/api/clients',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                cy.log(response.body[0].id)
                cy.log(response.body[0].created)
                cy.log(response.body[0].name)
                cy.log(response.body[0].email)
                cy.log(response.body[0].telephone)

            }))
        }))
    })

    it('Create a new client', function(){
        cy.authenticateSession().then((response =>{
            const payload = {
                "name":"silva",
                "email":"silva@email.com",
                "telephone":"498374983734"
            }
            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/client/new',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:payload
            }).then((response =>{
               //cy.log(JSON.stringify(response))
               const responseAsString = JSON.stringify(response)
               expect(responseAsString).to.have.string(payload.name)
            }))
        }))
    })

    it.only('Create a new client', function(){
        cy.authenticateSession().then((response =>{
            let fakeClientPayload = clientHelpers.createRandomClientPayload() 
            
            // post request to create a client
            cy.request({
                method: "POST",
                url: 'http://localhost:3000/api/client/new',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:fakeClientPayload 
            }).then((response =>{               
               const responseAsString = JSON.stringify(response)
               expect(responseAsString).to.have.string(fakeClientPayload.name)
            }))

            // GET request to fetch all clients
            cy.request({
                method: "GET",
                url: 'http://localhost:3000/api/clients',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                const responseAsString = JSON.stringify(response)
                expect(responseAsString).to.have.string(fakeClientPayload.name)
                expect(responseAsString).to.have.string(fakeClientPayload.email)
                expect(responseAsString).to.have.string(fakeClientPayload.telephone)
            }))
        }))
    })


})