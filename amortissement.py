capital_emprunter = 10000
taux_interet = 3
dure_pret = 3

taux_interet_mensuel =  3 /100 /12 

mensualite = capital_emprunter * (taux_interet_mensuel / (1 - (1 + taux_interet_mensuel)**(-dure_pret)))

tableau_amortissement = []

interet_mensuel = capital_emprunter * taux_interet_mensuel
capital_rembourse = mensualite - interet_mensuel 
capital_restant = capital_emprunter - capital_rembourse 

paiement_mensuel = {
    "capital_restant" : capital_restant,
    "interet_mensuel" : interet_mensuel,
    "capital_rembourse" : capital_rembourse,
    "mensualite" : mensualite,
}
tableau_amortissement.append(paiement_mensuel)

for i in range(1,dure_pret): 
 
    interet_mensuel = tableau_amortissement[i-1]["capital_restant"] * taux_interet_mensuel
    capital_rembourse = (mensualite - interet_mensuel) + tableau_amortissement[i-1]["capital_rembourse"]
    capital_restant = tableau_amortissement[i-1]["capital_restant"] - (mensualite - interet_mensuel)

    paiement_mensuel = {
        "capital_restant" : capital_restant,
        "interet_mensuel" : interet_mensuel,
        "capital_rembourse" : capital_rembourse,
        "mensualite" : mensualite,
    }
    tableau_amortissement.append(paiement_mensuel)


print(tableau_amortissement[1])



