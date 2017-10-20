/*	the trick to hide youtube logo is to create a huge iframe box, then offset the position of the 
	video content, while setting the wrapping box's overflow value to hidden */


/* .video-player--banner {
  position: absolute;
  /* (240 - 160) / 2 = 40 */


/*
  top: -40px;
  left: -50%;
  width: 200%;
  height: calc(720px + 40px);
} */


/* however, this approach will create potential layout inconsistency problems or other related issues
   I can't think about atm. Another approach demonstrated in another example is to use css attribute
   pointer-events: none; to disable youtube hover */


/* Unfortunately as great as this method is it creates a few draw backs:
	1, the option to pause the video play by clicking on the video is is disabled as well
	(which now thinking about it I realize I might be able to add it back by creating a transparent
	layer on top of the video as event listener to pause the video, which also means that we probably
	don't need the pointer-events: none)

	2, the youtube logo and the info icon still shows up onload */


/*
@media (min-screen: 1280px) {


};

*/