You are an expert pop music critic, able to label pop songs as different kinds of love songs using subtle context, emotions, & relational implications.

For each Billboard Top 10 hit in the form [song, performer] in the larger input array, I want you to respond with a valid JSON array of:

[performer, song, justification, love_song_subtype_label]

The justification is a short snippet explaining why the song best fits in the chosen category.

love_song_subtype_label labels comes from these love song subtype definitions (if it fits multiple definitions, choose the most suitable one):

"Serenade": A song directed at someone the singer loves, expressing their deep affection, undying love, infatuation, or praising someone as a soulmate.

"Sexual Conquest": Songs that are less about the object of affection and more about the singer's own prowess or success in romantic pursuits.

"Love Song for the Self": Songs that express self-love and affirmation, whether for one's character or physical qualities, sometimes following a period of growth or learning from past relationships.

"Good Riddance": typically after a breakup with someone who now seems unsuitable. songs about having had someone's love, but being glad now you've moved on (or realizing you should), often involving self-empowerment, anger, revenge, relief, or bitterness, often because of betrayal or potentially cheating.

"Longing & Heartbreak": songs where you love or miss someone, but they are unable to return your love. Either because you broke up and the relationship is over, or because you were never together and the love was unrequited. COuld be full of regret, longing, frustration, sadness, hopelessness, even grief.

"Courtship & Anticipation": the speaker is courting or seeking someone's romantic or sexual love, but they don't have it yet. The love interest does not yet know the speaker well, but the speaker hopes they will want to get to know them better and or please them the way they want.

"It's Complicated": Songs about complicated relationships, often with conflicting emotions like love, hate, frustration, and desire intermingling, whether light-hearted or profound in tone.

"Platonic Love": Songs about non-romantic yet strong and meaningful relationships, such as friendships or familial bonds.

"NA": song is not a love song at all. This would include any non-love song, but also instrumentals, for example.

Here's an example input:

```json
[
	["'N Sync", "This I Promise You"],
	["John Legend", "All of Me"],
	["Beyonce", "Halo"],
	["T-Pain Featuring Lil Wayne", "Can't Believe It"],
	["Adele", "Someone Like You"],
	["Mariah Carey", "Without You"],
	["Dolly Parton", "Jolene"],
	["Bill Withers", "Ain't No Sunshine"],
	["The Rolling Stones", "Miss You"],
	["Whitney Houston", "I Will Always Love You"],
	["Taylor Swift", "Teardrops on My Guitar"],
	["Lesley Gore", "She's A Fool"],
	["Taylor Swift", "You Belong With Me"],
	["Justin Timberlake", "Suit & Tie"],
	["T-Pain Featuring Mike Jones", "I'm N Luv (Wit A Stripper)"],
	["Rihanna", "Only Girl (In the World)"],
	["Britney Spears", "Hold It Against Me"],
	["T-Pain", "Buy U A Drank (Shawty Snappin')"],
	["2Pac", "Dear Mama"],
	["Saweetie", "Best Friend (feat. Doja Cat)"],
	["James Taylor", "You've Got a Friend"],
	["Bill Withers", "Lean On Me"],
	["Little Mix and Jason Derulo", "Secret Love Song"],
	["Katy Perry", "Hot N Cold"],
	["Pat Benatar", "Love Is a Battlefield"],
	["Lauryn Hill", "Ex-Factor"],
	["24kGoldn", "Mood"],
	["T-Pain", "I'm Sprung"],
	["Kelly Clarkson", "Since U Been Gone"],
	["Blu Cantrell", "Hit 'Em Up Style (Oops!)"],
	["Selena Gomez", "Look at Her Now"],
	["Taylor Swift", "Picture To Burn"],
	["Christina Aguilera", "Fighter"],
	["Jamie Foxx Featuring T-Pain", "Blame It"],
	["6ix9ine Featuring Nicki Minaj & Murda Beatz", "FEFE"],
	["The Beach Boys", "I Get Around"],
	["Robin Thicke ft. Pharrell & T.I.", "Blurred Lines"],
	["112", "Peaches & Cream"],
	["Lady Gaga", "Poker Face"],
	["Ariana Grande", "Thank U, Next"],
	["Lizzo", "Good As Hell"],
	["Christina Aguilera", "Beautiful"],
	["Britney Spears", "Womanizer"],
	["TLC", "No Scrubs"],
	["Meghan Trainor", "NO"],
	["Radiohead", "Creep"],
	["Rick Springfield", "Jessie's Girl"],
	["21 Savage & Metro Boomin", "Runnin"],
	["twenty one pilots", "Heathens"],
	["will.i.am & Britney Spears", "Scream & Shout"]
]
```

Here's the sample corresponding output:

```json
{
	"output": [
		[
			"'N Sync",
			"This I Promise You",
			"promising to always love someone",
			"Serenade"
		],
		[
			"John Legend",
			"All of Me",
			"praises lover, who's affection makes any struggle worth it, promises to give all of them",
			"Serenade"
		],
		[
			"Beyonce",
			"Halo",
			"celebrates the angelic quality of a lover and testifies to the positive changes as a result of this love",
			"Serenade"
		],
		[
			"T-Pain Featuring Lil Wayne",
			"Can't Believe It",
			"praises love interest, telling her of all the things he'll do for her",
			"Serenade"
		],
		[
			"Adele",
			"Someone Like You",
			"bemoans that a lover has moved on to a happy life with another partner while the speaker struggles to move on",
			"Longing & Heartbreak"
		],
		[
			"Mariah Carey",
			"Without You",
			"at the moment of a breakup, she expresses despair over everything she will lose",
			"Longing & Heartbreak"
		],
		[
			"Dolly Parton",
			"Jolene",
			"her heart is breaking because she fears her male lover will be easily stolen by another woman",
			"Longing & Heartbreak"
		],
		[
			"Bill Withers",
			"Ain't No Sunshine",
			"when a lover is away, he expresses that his world seems to become darker",
			"Longing & Heartbreak"
		],
		[
			"The Rolling Stones",
			"Miss You",
			"expresses how deeply he misses the lover, and wishes he didn't have to wait",
			"Longing & Heartbreak"
		],
		[
			"Whitney Houston",
			"I Will Always Love You",
			"wishes her now gone lover well, reminisces, will never forget",
			"Longing & Heartbreak"
		],
		[
			"Taylor Swift",
			"Teardrops on My Guitar",
			"she's in love with a friend who's in love with someone else, she has to pretend she doesn't love him but secretly she's suffering",
			"Longing & Heartbreak"
		],
		[
			"Lesley Gore",
			"She's A Fool",
			"her love is with another woman who doesn't appreciate his virtues, longs to some day be noticed by him",
			"Longing & Heartbreak"
		],
		[
			"Taylor Swift",
			"You Belong With Me",
			"she's making an empassioned argument that her love object should be with her instead of who he's currently with",
			"Courtship & Anticipation"
		],
		[
			"Justin Timberlake",
			"Suit & Tie",
			"looking forward to a night of dancing with his beloved",
			"Courtship & Anticipation"
		],
		[
			"T-Pain Featuring Mike Jones",
			"I'm N Luv (Wit A Stripper)",
			"he has strong romantic and sexual feelings for a stripper who doesn't yet know him personally",
			"Courtship & Anticipation"
		],
		[
			"Rihanna",
			"Only Girl (In the World)",
			"telling her new love how she wants him to make her feel",
			"Courtship & Anticipation"
		],
		[
			"Britney Spears",
			"Hold It Against Me",
			"she's interested in a stragner and approaches them hoping to see if they might get together",
			"Courtship & Anticipation"
		],
		[
			"T-Pain",
			"Buy U A Drank (Shawty Snappin')",
			"he spots a woman at the bar and offers to buy her a drink as a prelude to potentially getting together",
			"Courtship & Anticipation"
		],
		[
			"2Pac",
			"Dear Mama",
			"love and appreciation for his mother",
			"Platonic Love"
		],
		[
			"Saweetie",
			"Best Friend (feat. Doja Cat)",
			"boasts about a close friend who is succesful and strong",
			"Platonic Love"
		],
		[
			"James Taylor",
			"You've Got a Friend",
			"promises a close friend they'll be there thick and thin",
			"Platonic Love"
		],
		[
			"Bill Withers",
			"Lean On Me",
			"invites a friend to rely on him when they are struggling, as everyone needs platonic support at times",
			"Platonic Love"
		],
		[
			"Little Mix and Jason Derulo",
			"Secret Love Song",
			"the speakers long to be united with their lover in public, but must remain in secret",
			"It's Complicated"
		],
		[
			"Katy Perry",
			"Hot N Cold",
			"about navigating a lover who cannot make up their mind and is inconsistent",
			"It's Complicated"
		],
		[
			"Pat Benatar",
			"Love Is a Battlefield",
			"the relationship she is in alternates between being loving and painful and she doesn't feel like she can leave",
			"It's Complicated"
		],
		[
			"Lauryn Hill",
			"Ex-Factor",
			"she feels trapped in a relationship where she feels she's giving more than she's recieving, but whenever she tries to leave, she can't",
			"It's Complicated"
		],
		[
			"24kGoldn",
			"Mood",
			"bemoans why his female love interest is always difficult, moody, and inconsistent",
			"It's Complicated"
		],
		[
			"T-Pain",
			"I'm Sprung",
			"knows his love interest doesn't deserve him, yet he can't stay away, he vascilates between feelings of deep love and wanting to get away as fast as possible",
			"It's Complicated"
		],
		[
			"Kelly Clarkson",
			"Since U Been Gone",
			"ending a bad relationship leaves her feeling better and more in control",
			"Good Riddance"
		],
		[
			"Blu Cantrell",
			"Hit 'Em Up Style (Oops!)",
			"reacts to being cheated on by gleefully spending her ex-lover's money, as an act or revents",
			"Good Riddance"
		],
		[
			"Selena Gomez",
			"Look at Her Now",
			"after being cheated on, she has now moved on and is better than ever",
			"Good Riddance"
		],
		[
			"Taylor Swift",
			"Picture To Burn",
			"after realizing how self-centered and unsuitable her ex-lover is, she vents about all of his negative qualities",
			"Good Riddance"
		],
		[
			"Christina Aguilera",
			"Fighter",
			"she thanks the lover because his abuse actually ended up making her stronger and wiser",
			"Good Riddance"
		],
		[
			"Jamie Foxx Featuring T-Pain",
			"Blame It",
			"speaker brags about his sexual power & alure, confident his love interest will want to hook up with him",
			"Sexual Conquest"
		],
		[
			"6ix9ine Featuring Nicki Minaj & Murda Beatz",
			"FEFE",
			"about sexual prowess with many sexual references",
			"Sexual Conquest"
		],
		[
			"The Beach Boys",
			"I Get Around",
			"brag about constantly seeking out new women and never being rejected",
			"Sexual Conquest"
		],
		[
			"Robin Thicke ft. Pharrell & T.I.",
			"Blurred Lines",
			"speaker brags about being about to 'get nasty' with a good girl who he claims wants sex",
			"Sexual Conquest"
		],
		[
			"112",
			"Peaches & Cream",
			"about sex & being addicted to a tasty woman",
			"Sexual Conquest"
		],
		[
			"Lady Gaga",
			"Poker Face",
			"brags about a male sex partner who does not know she is sleeping with a women as well",
			"Sexual Conquest"
		],
		[
			"Ariana Grande",
			"Thank U, Next",
			"brags about being unfased and even improved by past relationships ending, and in fact is now thriving in life",
			"Love Song for the Self"
		],
		[
			"Lizzo",
			"Good As Hell",
			"an anthem for leaving behidn negativity or men who don't love you anymore, and instead enjoying who you are with pride",
			"Love Song for the Self"
		],
		[
			"Christina Aguilera",
			"Beautiful",
			"an anthem proclaiming ones beauty, even in the face of deragatory words or spiteful ex-lovers",
			"Love Song for the Self"
		],
		[
			"Britney Spears",
			"Womanizer",
			"in her prowess, she recognizes a womanizer and rejects his advances",
			"Love Song for the Self"
		],
		[
			"TLC",
			"No Scrubs",
			"speakers asserts that they will reject so-called scrubs because she wants a higher quality man",
			"Love Song for the Self"
		],
		[
			"Meghan Trainor",
			"NO",
			"an anthem for women to confidently reject unwanted male advances, because the men aren't needed for the women to be in the zone",
			"Love Song for the Self"
		],
		[
			"Radiohead",
			"Creep",
			"in contrast to his love interest's angelic nature, he feels ugly and invisible, and hates on himself, which does not fit in Longing & Hearbreak or even Good Riddance",
			"Longing & Heartbreak"
		],
		[
			"Rick Springfield",
			"Jessie's Girl",
			"praises his friends lover and expresses he's confused she isn't into him too, and he's jealous: themes to unusual to fit into the given love song subtypes.",
			"It's Complicated"
		],
		["21 Savage & Metro Boomin", "Runnin", "a gangster rap, not romance", "NA"],
		[
			"twenty one pilots",
			"Heathens",
			"about social outcasts, not romance",
			"NA"
		],
		[
			"will.i.am & Britney Spears",
			"Scream & Shout",
			"about dancing in the club, with no real elements of romance directed toward a specific love interest",
			"NA"
		]
	]
}
```

Ok, now generate the output for this input:
