// Dictionary of valid 5-letter words for guess validation
const rawWords = `
about above abuse actor acute admit adopt adult after again agent agree ahead alarm album
alert alike alive allow alone along alter among anger angle angry apart appeal apple apply
arena argue arise array arrow aside asset audio audit avoid award aware badly baker bases
basic basin basis beach beam beard beast beauty began begin begun being below bench berry
bible birth black blade blame blank blast blend blind block blood bloom blown blues board
boast bobby bonus boost booth bound brain brand brave bread break breed brief bring broad
broke brown brush build built buyer cabin cable cache camel camera campy canal candy cargo
carry carve cases catch cater cause cedar chain chair chalk champ chart chase cheap check
cheek cheer cheer chess chest chief child chili chill china chips choir chose cycle cyber
cigar claim class clean clear climb clock close cloth cloud clown coach coast cobra cocoa
coded codes colby color column combo comfy comic condo cords corps couch cough could count
court cover craft crane crank crash crawl crazy cream crime crisp cross crowd crown crude
cruel crush crust crystal cubic curly cycle daddy daily dairy daisy dance dated dates dawn
death debut delay depth derby devil diary dirty ditch doing dolly donor doubt dough draft
drama drank drawn dream dress dried drift drill drink drive drove drugs drum drunk dryer
dusty dutch dying eager eagle early earth earthy eased easel eaten eater elbow elder elect
elite empty enemy enjoy enter entry equal error essay ether ethic event every extra faint
fairy faith false fancy fares fatal favor feast feeds feels fever fewer fiber field fifth
fifty fight figure files filed fills films final findy fined finer first fishy fists fixed
fixes flags flame flash flask flats fleas flesh flies fling flint flips float flock flood
floor flora floss flour flowy flute flyer focus foggy folds folio folks force forge forth
forty forum found frame frank fraud fresh fried fries froggy frogs front frost fruit fully
funny fuzzy gamer games gamma gates gauge gears gecko gents giant gifts gipsy girls given
gives gland glass globe glory gloss glove glowy goals goaty going goldy goner goods goody
grace grade grain grand grant grape graph grasp grass grave gravy great green greet grids
grief grill grind grips gross group grove grown grows guard guess guest guide guild guilt
habit hairy halfs hands handy happy harry harsh haste hasty hates haven havoc heads heady
heals heard heart heavy hedge heels hello helps hence herbs herds heros highs hills hilly
hints hippo hippy hired hires hobby holds holes holly homes homey honey honor hoods hooks
hoped hopes horny horse hosts hotel hotty hound hours house hover howdy human humid humor
hurry hurts husks husky icons ideal ideas idiot image imply index inbox inner input intel
intro irons irony issue items ivory jacks jaded jails jelly jewel joint jokes jokey jolly
jones juice juicy jumps jumpy junky juror kappa karma keeps kelpy keyed keys kicks kicky
kinds kings kingy kiosk kisses kissy kiten kitty knave knead knees knelt knife knock knots
known knows label labor laced laces lacks ladles lakes lamby lamps lance lands lanes lanky
lapel lapis lapse large larva laser lasts latch later latex latte laugh lawns lawny layer
leads leafy leaks leaky leans leant leaps leafy learn lease leash least leave ledges leeds
lefty legal lemon lends lenti level lever lewis liary libel libra liesy lifts light liked
likes limbs limit lined linen lines lingo links lions lipsy liquid lispy lists lives livid
llama loads loans loath lobby local locks locks lodge lofty logic logos looks looky loops
loopy loose lords loses lossy losts lotus louds louse loved lover loves lowed lower loyal
lucid lucky lumps lumpy lunar lunch lungs lurch lured lures lurks lying lymph lyric macaws
macho macro madam mafia magic magna magma magnet maids mails mails mains maize major maker
makes malts malty mambo mamma mango mania manly manor maple mapsy march mares marge marks
marry marsh masks mason match mates matey maths mauve maxim maxis maybe mayor mealy means
meant meats meaty medal media meets melon melts mercy merge merit merry metal metro micro
midge midst might miles milky mills mimic minds mined miner mines mingo minor mints minty
minus mirth misery misty mixed mixer mixes modal model modem modes moist molds moldy moles
money mongo monks month moody moons moony moors moose moral morse motel motor motto mound
mount mourn mouse mouth moved mover moves movie mowers mucks mucky mucus muddy muffin mules
multy mummy munch mural murks murky mused muser muses mushy music musts musty muted muter
mutes mutts mysql mythic myths nails naivy naive naked named names nanny nasty natal naval
navel navys neary nears necks needs needy neighbor neony nerve nervy nests netty never newer
newly newsy nexts niche nicks niece night nines ninny ninth noble nobly nodes noise noisy
nomad nones nookys noons noose north nosey notch noted notes nouns novel nudes nudge nukes
nulls numbs nurse nutsy nylon nymph oaken oases oasis oaths obese obeys occur ocean octal
octets odder oddly odors offer official often ohioy oiled olden older olive omega onion
onset opens opera opine opium optic orbit order organ other otter ought ounce outdo outer
outgo output ovens overs overt owned owner oxide ozone paced paces packs packs pacts paddy
padre pages paidy pains paint pairs paley palms palmy palsy panel panic pansy pants panty
papal paper parer parks parry parse parts party pasta paste pasty patch paths patio patsy
patty pause paved paver paves pawns payee peach peaks peaky pearls pearly pears pease peats
peaty pedal peeks peers penal pence penis penny peony peopl pepper perch perks perky perms
pesky pests petal petes petty phase phone phony photo piano picks picky piece piers piety
piggy piles pills pilot pimps piney pings pinks pinky pinot pints pinua piona pions pious
piped piper pipes pipit pique pitch piths pithy pivot pixel pizza place plaid plain plane
plank plans plant plate plays plaza plead pleas pleat plebe plebs pluck plugs plumb plume
plump plums plumy plush poach pocket poems poesy poets point poise poker pokey polar poles
police polio polka polls polly polymer ponds ponts pooch poods pools poope poops poopy
popes poppy porch pored pores porks porky ports posed poser poses posit posse posts potes
potty pouch pound pours pouts power poxes prams prank prate prawn prays preen preps press
prexy price prick pride pried pries prims prime primo primp print prior prism privy prize
probe prods promo prompt prone prong proof props prose prosy proud prove prowl prows proxy
prude prune pryer psalm pshaw psych pubes public pucks pudgy puffs puffy pukes pulls pulpy
pulse pumas pumps punch punks punky punny punts pupil puppy purey purer purge purls purrs
purse pushy pussy putts putty pyres pyths pyxon quack quads quaff quail quake qualy qualm
quant quark quart quash quasi queen queer quell query quest queue quick quiet quill quilt
quint quips quirk quite quits quota quote quoth rabid raced racer races racks radar radii
radio radix rads rafts ragas rages raids rails rains rainy raise rajah raked rakes rally
ralph rambo ramps ranch randy range rangy ranks rants raped raper rapes rapid rarer rares
rarity rased raser rases rasps raspy rated rater rates ratio ratty raved ravel raven raver
raves rawly rayon razor reach react reads ready realy realm reams reaps rears rebel rebut
recap recur redox reeds reedy reefs reeks reeky reels reeves refer refit reflow refry
regal rehab reign reins relay relic reman remix renal rends renew rents reorg repay repel
reply rerun reset resin resists rests retro retry reuse revue rheum rhino rhyme rhythm
ribbon riced ricer rices richy rider rides ridge ridgy riffs rifle rifts right rigid rigor
riled riles rills rinds rings ringy rinks rinse riots ripen riper rises risks risky rites
ritzy rival rived river rives rivet roach roads roams roans roars roast robed robes robin
robot rocks rocky rodeo roger rogue roles rolls roman romeo romps roofs rooks rooky rooms
roomy roost roots rooty ropes ropey roses rosin rosts rosty rotary rotor rough round rouse
rout road rowdy rowed rower royal rubes ruby rucks ruddy ruder rudes ruins ruled ruler
rules rumba rummy rumor rumps runic runny runts rupee rural ruses rushy rusts rusty ruths
saber sable sabre sacks sacra sadder sades sadhu sadly safer safes sagas sager sages saggy
sahib sails saint saits salad sales sally salon salsa salts salty salve salvo samba samey
sands sandy saner sanes sapor sappy saris sarse sassy satan sated sates satin satyr sauce
saucy sauls sauna saute saved saver saves savor savoy sawed sawer saxon scabs scads scald
scale scalp scaly scamp scans scant scare scarf scary scene scent schwa scion scoff scold
scoop scoot scope score scorn scour scout scowl scows scrab scram scrap scree screw scrip
scrod scrub scuba scuds scuff scull scums scurf seals seams seamy sears seats sebum sects
sedan seder sedge seeds seedy seeks seems seeps seepy seers segas segue seize sells semen
semis sends senna senor sense sepal sepia sepoy septa serfs serge serif serum serve servo
setup seven sever sewed sewer sexed sexes sexts shack shade shady shaft shags shaggy shahs
shake shaky shale shall shalt shame shams shank shape shard share shark sharp shats shave
shawl shays sheaf shear sheds sheen sheep sheer sheet shelf shell sheng sheol sherd shewn
shied shier shies shift shill shily shims shine shiny shins ships shire shirk shirt shite
shits shiva shive shivs shoal shoat shock shoed shoes shoji shone shook shoos shoot shops
shore shorn short shote shots shout shove shown shows showy shred shrew shuck shuns shunt
shush shute shuts shyly siber sibil sicky sicks sidey sides sidle siege sieve sifts sighs
sight sigma signs silks silky sills silly silts silty silva simps since sines sinew singe
sings sings sinks sinny sinus sires sirup sises sissy sites situp sivan sixes sixth sixty
sized sizer sizes skate skews skids skied skier skies skiff skill skimp skims skins skint
skiny skips skirt skits skive skoal skuas skulk skull skunk skyed slabs slack slags slain
slake slams slang slant slaps slash slate slats slave slaws slays sleds sleek sleep sleet
slept slews slice slick slide slier slily slime slimy sling slink slips slits sloe slogs
sloop slope slops slosh sloth slots slowy slows sluds sludge sludy slugs slums slump slums
slung slunk slurp slush sluts slyer slyly smack small smart smash smear smell smelt smews
smile smirk smite smith smits smock smoggy smoke smoky smote smuts snack snafu snags snail
snake snaky snaps snare snarl snash snatch snaws sneak sneer snell snick snide sniff snift
sniny snipe snips snits snobs snood snook snoop snoot snore snort snots snout snowy snows
snubs snuff snugy soaks soaps soapy soars sober socks sodas soddy sofay sofas softy softs
soils soily solar soldo solds soled soles solid solos solve somas sonar sones songs songy
sonic sonny sonse sonus sooth sooty soops sooty sores sorry sorts sorty souls sound soups
soupy soury sours souse south sowed sower space spacy spade spain spans spank spans sparer
spares spark spars spasm spats spawn spaws speak spear specs speed speel speer spell spelt
spend spent sperm spews spice spicy spied spies spike spiky spill spilt spine spiny spins
spire spire spits spite spitz splat splay split spoil spoke spoof spook spool spoon spoor
spore sport spots spout sprag spray spree sprig sprue spuds spume spumy spunk spunky spurs
spurt sputa squab squad squat squaw squeg squib squid squim squint squire squirm squirt
stabs stack staff stage stags stagy staid stain stair stake stale stalk stall stamp stand
stane stang stank stans staph stare stark stars start stash state stats stave staws stays
stead steak steal steam steed steel steep steer stela stemme stems steno steps stere stern
stets stews stick stied sties stiff stile still stilt sting stink stint stipe stirp stirs
stite stive stoae stoas stoat stock stogy stoke stole stomaomp stone stony stood stool
stoop stoop stops store storm story stoup stout stove stown stows strap straw stray strep
strew stria strip strow stroy strum strut stubs stuck studs study stuff stull stumb stump
stums stung stunk stuns stunt stupa stupe style styli styls suave sucks sucky sudor sudsy
suedes suer suers sues suety sugar suing suite suits suite sulfa sulfo sulks sulky sully
sumac sumas sumps sunup sunny sunflower super suras surds surer surfy surfs surge surgy
surly sushi sutra swads swage swags swain swami swamp swampy swang swank swanky swans snaps
sware swarf swarm swart swary swash swath swats swaws swayy sways swear sweat swede sweep
sweet swell swept swick swift swigs swill swims swine swing swink swipe swirl swish swiss
swith swive swobs swoon swoop swops sword swore sworn swung syces sycee syrah syren syrup
systo tabes tabid table taboo tabour tabu tabor taces tacet tachy tacly tacos tacts daddy
taffy tails taint taken taker takes talcs talcy tales talks talky tally talcs talon talus
tamed tamer tames tammy tango tangy tanks tansy tanto taped taper tapes tapir tapis tardy
tared tares target tariff taser tasks taste tasty tater tatty taunt taupe taxer taxes taxis
taxon teach teads tea-y teams tears teary tease teats techy teddy teems teens teeny teeth
teles tells tempo temps tempt tench tends tenet tenny tenor tense tenth tents tepee tepid
terms terns terra terry terse tests testy tetra texas texts thanks thank thany tharm thaws
theca theft theme thens theory there therm these theta thews thewy thick thief thigh thill
thine thing think thins third thirl thirt thiss thoes thole thong thorn thoro thorp those
thous thraw three threw thrid thrip throb throe throw thrum thuds thugs thuja thumb thump
thurl thurs thuse thyme tiara tiber tibiae tibias ticks ticky tidal tides tidy tieds tierce
tiers tiffs tiger tight tikes tilas tiled tiler tiles tills tilth tilts timed timer times
timid tines tings tinny tints tipsy tirade tired tires tirls tisane titan tithe title titly
titre titty toad-y toads toast toby today toddy toffs toffy togas toges toils toise token
tolds toled toles tolls tolly tolus tombs tommy tonal toned toner tones tongs tonic tonne
tonus tools toomy toons toope toops tooth toots topaz topee topes topic topos toppy toque
torah toras torc-y torcs tores toric torns toros torot torse torsi torso torts torus toses
tossy total toted totem toter totes totty touch tough toured toury tours touse touts towed
towel tower towie towy towns towny toxic toxin toyed toyer toyon tozes trace track tract
trade tragic trail train trait trame tramp trams trank tranq trans traps trapt trash trass
trave travis trawls trays tread treat treed treen trees trets trews treyf triac triad trial
tribe trice trick trics tried trier tries trigo trigs trike trill trims trine trink trips
trite triune troad troak trock trode trog-y trogs trois troll tromp trona trone troop trope
troth trots trout trow-y trows troys truce truck trued truer trues trugs fruit trump trunk
trush trust truth tryer tryma tryst tsars tubal tubas tubby tubed tuber tubes tucks tucks
tudors tufts tufty tugger tugs tulsa tumid tummy tumor tump-y tumps tunas tuned tuner
tunes tungs tunic tunny tuque turco turfs turfy turks turns turret tusks tusky tutee tutor
tutti twaes twain twang twank twas-y twats tweaks tweaky tweed tweel tween tweet tweir
twerps twice twier twigs twiggy twill twins twiny twine twins twiny twirl twirp twist twits
twixt twoer tyers tying tykes tymps tynde tynes typey typed typer types typhic typhus typic
typos tyros tythe tzary tzars udder ulcer ulnar ultra umbel umber umbos umbra umiak umpir
unapt unarm unary unban unbar unbay unbid unbox uncap uncle uncut under undid undos undue
undye unfit unfix unget ungirt unglue ungot ungot ungum unhair unhand unhang unhasp unheed
unhelm unhinge unhood unhook unhors unhung unhurt unhusk unias unit-y units unite unity
unjust unkempt unkennel unkey unknit unknot unknow unlace unlade unlaid unlatch unlay unlead
unlearn unleash unled unlet unlick unlike unlink unload unlock unloose unmade unmake unman
unmask unmet unmew unmold unmoor unnail unpave unpen unpin unplait unplug unquote unray
unread unreeve unrig unripe unrobe unroll unroof unroot unround unruly unsafe unsaint unsay
unscrew unseal unseam unseat unsee unsew unsex unshack unshape unshare unsheath unship unshod
unshoe unshorn unshrink unshut unsift unsight unsing unslick unslung unslush unsmok unsnap
unsnak unsnarl unsnap unsod unsole unsolv unsown unspad unspak unspeak unspen unspent unspin
unsplit unspok unspoken unspoil unspon unspotted unsprung unspun unsqur unstable unstack
unstate unstay unsteel unstep unstick unstop unstrap unstrep unstring unstrip unstruc unstuck
unstud unstud-y unstyle unsubst unsung unsure unswad unswar unswear unsweat unsweep unswept
unswor unsworn unsym untac untack untag untail untam untamed untang untangle untap untaped
untarget untariff untaste untasty untater untatty untaunt untax untaxed untaxes untaxis untaxon
unteac unteach unteam untears unteary unteas untease unteat untech untechy untedd unteddy
unteem unteens unteeny unteeth untel untell untempo untemps untempt untench untends untenet
untenny untenor untense untenth untents untepee untepid unterms unterns unterra unterry
unterse untests untesty untetra untixas unti-y untidy untieds untier untiers untiff untiger
untight untike until untily untime untimid untine unting untinny untint untips untipsy
untira untirade untired untires untirl untis untit untitan untith untithe untitl untitle
untitly untitr untitre untitty untoad untoady untoad-y untoads untoas untoast untoby untoday
untoddy untoffs untoffy untogas untoges untoils untoise untoke untoken untolds untoled untoles
untolls untolly untolus untombs untommy untonal untoned untoner untones untongs untonic untonne
untonus untool untooly untoons untoop untoops untooth untoots untopaz untopee untopes untopic
untopo untoppy untoque untora untorah untoras untorc untorcy untorcs untores untoric untorns
untoros untorot untors untorse untorsi untorso untort untorts untorus untoses untoss untossy
untot untotal untoted untotem untoter untotes untotty untouch untoug untough untour untoury
untours untous untouts untow untowed untowel untowe untower untowi untowie untowy untowns
untowny untox untoxic untoxin untoy untoyed untoyer untoyo untoyon untoze untozes untrac untrace
untrac-y untracks untract untrade untrag untragic untrai untrail untrain untrait untram untramp
untrams untran untrank untranq untrans untrap untraps untrapt untras untrash untrass untrav
untrave untravis untrawl untrawls untrays untrea untread untreat untreed untreen untrees untret
untrets untrews untrey untreyf untria untriac untriad untrial untrib untribe untric untrice
trick untrics untried untrier untries untrig untrigo untrigs untrik untrike untril untrill
untrim untrims untrin untrine untrink untrips untrit untrite untriu untriune untroa untroad
untroak untrock untrode untrog untrogy untrogs untroi untrois untrol untroll untrom untromp
untrona untrone untroo untroop untrop untrope untrot untrots untrou untrout untrow untrowy
trows untroys untruc untruce untruck untrud untrued untruer untrues untrug untrugs untrum
untrump untrun untrunk untrus untrush untrust untrut untruth untrye untryer untrym untryma
untrys untryst untsar untsars untuba untubal untubas untubb untubby untube untubed untuber
untubes untuck untucks untud untudors untuft untufts untufty untugg untugger untuggs untuls
untulsa untumi untumid untumm untummy untumo untumor untump untumpy untumps untuna untunas
untune untuned untuner untunes untung untungs untuni untunic untunn untunny untuqu untuque
unturc unturco unturf unturfs unturfy unturk unturks unturn unturns unturr unturret untusk
untusks untusky untute untutee untuto untutor untutt untutti untwae untwaes untwai untwain
untwan untwang untwank untwas untwasy untwats untwea untweak untweaks untweaky untwee untweed
untweel untween untweet untwei untweir untwer untwerps untwic untwice untwie untwier untwig
twiggy untwigs untwil untwill untwin untwins untwiny untwine untwins untwiny untwir untwirl
untwirp untwis untwist untwit untwits untwix untwixt untwoe untwoer unty-y untyer untying
untyke untykes untymp untymps untynd untynde untynes untype untypey untyped untyper untypes
untyph untyphic untyphus untypic untypos untyro untyros untyth untythe untzar untzary untzars
uncles uncut under undid undue unfit unify union unite units unity upter upper upset urban
urged urger urges urine usage users usher using utility uteri utter vacation vague vails
vales valet valid valor value valve vamps vaned vanes vapor vased vases vault vaunt veals
vealy veils veins veiny velar velds velum venal vends venom vents venue verbs verge verse
verso verts verve vesty vests vetch vexed vexes vials viand vibes vicar vices video views
viewy vigils vigor viler villa vines vinyl viola viols viper viral virus visits visor vista
vital vitas vitro vivid vocal vodka vogue voice voids voiles volts votes voter vowed vowel
vague value valve vapor vases vault veils veins velar velum venom vents verbs verge verse
verts verve vests vials vibes vicar vices video views vigils vigor villa vines vinyl viola
viols viper viral virus visits visor vista vital vivid vocal vodka vogue voice voids votes
voter vowed vowel waded wader wades wafer wafts waged wager wages wagon waifs wails wains
waist waits waive waked waken waker wakes waldo wales walks walky walls wands waned wanes
wanly wants wards wares warms warny warns wraps watch water watts waved waver waves wavey
waxed waxen waxer waxes weals weans wears weary weave webby wedgy wedge weeds weedy weeks
weeny weeps weepy wefts weigh weird weirs welch welds wells welsh welts wench wends wests
wetly whack whale whams wharf whats wheat wheel whelk whelm whelp whens where whets whews
wheys which whiffs whigs while whims whiny whine whips whipt whirl whirr whirs whish whisk
whist white whits whity whizz whole whoop whoops whore whorl whose whoso whups wiced wices
wicks widens wider widow width wield wiles willy wilds wiled wiles wills willy wilts wimpy
wimps wince winch winds windy wines winey wings wingy winks winny winos wiped wiper wipes
wired wirer wires wised wiser wises wishy wishs wisps wispy witch witty wives woads woked
wokes wolds wolfs woman womby wombs women wonky woods woody wooed wooer woofs wooly wools
woozy words wordy worked worker works world worms wormy worry worse worst worth would wounds
woven wowed wrack wraps wrath wreak wreck wrens wrest wrier wring wrist write writs wrong
wrote wroth wrung wryly xebec xenia xenon xeric xiang xylan xylem xylic xylyl yacht yacks
yager yahoo yaird yanks yards yarny yarns yawed yawls yawns yearn yeast yeats yelps yemen
yenta yeses yield yipes yobbo yodel yoked yokel yokes yolks yolky yonge young yours youth
ypres yttri yucca yucks yucky yukon yules yuloh yuman yumas yummy yupie yupon yuppy yurta
yurts yuzus zambo zanza zanza zappy zarfs zaxes zealot zeals zebra zebu-y zebus zechs zeddy
zeins zemas zenit zenith zeros zests zesty zetas zibet zilch zills zincs zincy zines zings
zingy zinke zinky zions zippy ziram zitis zizit zlote zloty zoaea zoeae zoeal zooid zolot
zombi zombie zonal zoned zoner zones zonks zonky zooey zooid zoold zoons zoopy zooty zoppo
zowie zunis zuzim zymase zymes zymic zymin zythum
`;

const wordSet = new Set(
  rawWords
    .trim()
    .split(/\s+/)
    .map((w) => w.toUpperCase())
    .filter((w) => w.length === 5)
);

export function isValidWord(word: string): boolean {
  return wordSet.has(word.toUpperCase());
}
