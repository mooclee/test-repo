///*
var svg_obj = {
	
	pin: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 21.434 21.434" style="enable-background:new 0 0 21.434 21.434;" xml:space="preserve"><path  d="M9.497,6.773c0.389,1.329,2.557,8.343,3.387,11.024l0,0c0.678,2.188,2.269,3.637,2.269,3.637l0,0c0,0,0.491-2.096-0.187-4.281l0,0c-0.826-2.67-2.996-9.688-3.42-11.014l0,0L9.497,6.773z"/><path  d="M4.649,3.046L6.08,4.067l1.628,5.26c-0.682,0.99-0.935,2.158-0.594,3.258l0,0c0.669,2.163,10.336-0.831,9.667-2.993l0,0c-0.341-1.101-1.21-1.92-2.332-2.353l0,0L12.821,1.98l0.604-1.65L4.649,3.046z"/><path d="M8.741,0.734c-2.423,0.75-4.264,1.758-4.112,2.25l0,0C4.781,3.476,6.87,3.266,9.293,2.516l0,0c2.862-0.887,4.201-1.963,4.113-2.25l0,0C13.348,0.086,13.035,0,12.539,0l0,0C11.681,0,10.279,0.258,8.741,0.734L8.741,0.734z"/></svg>',
	
	search: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 250.313 250.313" style="enable-background:new 0 0 250.313 250.313;" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236C170.146,140.044,140.043,170.146,102.911,170.146z"/></svg>',
	
	
	//stamp:'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 522.462 522.462" style="enable-background:new 0 0 522.462 522.462;" xml:space="preserve"><path d="M468.039,348.667H362.545c-71.512-49.743-38.64-122.996-12.213-181.403c11.037-24.294,19.745-43.495,19.745-58.777c0-70.989-54.771-108.128-108.89-108.128c-54.075,0-108.803,37.138-108.803,108.128c0,15.347,8.751,34.613,19.81,58.929c26.493,58.298,59.386,131.399-12.278,181.251H54.423C24.403,348.667,0,372.352,0,402.372v65.308c0,6.03,4.898,10.885,10.885,10.885h10.885v32.654c0,6.03,4.898,10.885,10.885,10.885h457.154c5.987,0,10.885-4.855,10.885-10.885v-32.654h10.885c5.987,0,10.885-4.855,10.885-10.885v-65.308C522.462,372.352,498.058,348.667,468.039,348.667z M478.923,501.052H43.539v-22.488h435.385V501.052z"/></svg>', // bw 1: like a person's head
	
	//stamp: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 294.667 294.667" style="enable-background:new 0 0 294.667 294.667;" xml:space="preserve"><path d="M293.94,231.169l-18.47-57.332c-2.002-6.19-7.767-10.594-14.272-10.594H213.66c-16.087,0-30.408-10.593-34.828-26.064l-0.272-0.848c-3.452-12.081-0.209-25.119,8.674-34.963c9.95-11.028,14.793-25.851,13.286-40.714c-2.464-24.298-24.315-45.423-48.713-47.109c-1.232-0.085-2.48-0.121-3.711-0.121c-29.06,0-52.701,23.645-52.701,52.704c0,13.479,5.087,26.307,14.324,36.116c8.367,8.887,11.398,21.987,7.91,34.196l-0.271,0.743c-4.419,15.467-18.74,26.06-34.827,26.06H34.993c-6.374,0-12.052,4.238-14.158,10.254L0.842,230.725c-1.605,4.588-0.889,9.952,1.925,13.917c2.813,3.965,7.372,6.602,12.233,6.602h9.667v22.5c0,4.143,3.69,7.5,7.833,7.5h227c4.143,0,7.167-3.357,7.167-7.5v-22.5h13c4.798,0,9.306-2.524,12.129-6.404C294.619,240.96,295.415,235.735,293.94,231.169z M251.667,266.244h-212v-15h212V266.244z"/></svg>', // bw 2: still like a person's head
	
	stamp:'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve"><path id="XMLID_108_" style="fill:#C7A06B;" d="M53.614,53H4.386C3.621,53,3,52.379,3,51.614V40.386C3,39.621,3.621,39,4.386,39h49.229C54.38,39,55,39.621,55,40.386v11.228C55,52.379,54.38,53,53.614,53"/><path id="XMLID_107_" style="fill:#645D5A;" d="M47,58H11c-2.761,0-5-2.239-5-5h46C52,55.761,49.761,58,47,58"/><rect id="XMLID_106_" x="21" y="33" style="fill:#DFB288;" width="16" height="6"/>	<path id="XMLID_105_" style="fill:#FAC176;" d="M40,11c0-6.501-5.639-11.685-12.293-10.926c-4.918,0.561-8.941,4.489-9.604,9.394c-0.55,4.07,1.131,7.775,3.988,10.082C23.999,21.089,25,23.491,25,25.941V33h8v-7.242c0-2.37,0.989-4.682,2.844-6.157C38.375,17.588,40,14.486,40,11"/></svg>', // color 1
	
	//stamp: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve"><rect id="XMLID_108_" x="7" y="48" style="fill:#C7A06B;" width="44" height="6"/><rect id="XMLID_107_" x="10" y="44" style="fill:#DFB288;" width="38" height="4"/><path id="XMLID_106_" style="fill:#FAC176;" d="M31,44h-6L20.903,7.949C20.422,3.712,23.736,0,28,0c4.264,0,7.578,3.712,7.097,7.949L31,44z"/><path id="XMLID_105_" style="fill:#645D5A;"	// color 2 d="M44,58H14c-2.209,0-4-1.791-4-4h38C48,56.209,46.209,58,44,58"/></svg>',
	
	todolist: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 381.39 381.39" style="enable-background:new 0 0 381.39 381.39;" xml:space="preserve"><path d="M365.499,174.804h-254.26c-8.772,0-15.891,7.119-15.891,15.891c0,8.772,7.119,15.891,15.891,15.891h254.26c8.74,0,15.891-7.119,15.891-15.891C381.39,181.923,374.239,174.804,365.499,174.804z"/><path d="M111.239,79.456h254.26c8.74,0,15.891-7.119,15.891-15.891s-7.151-15.891-15.891-15.891h-254.26c-8.772,0-15.891,7.119-15.891,15.891S102.467,79.456,111.239,79.456z"/><path d="M365.499,301.934h-254.26c-8.772,0-15.891,7.151-15.891,15.891s7.119,15.891,15.891,15.891h254.26c8.74,0,15.891-7.151,15.891-15.891S374.239,301.934,365.499,301.934z"/><circle cx="15.891" cy="63.565" r="15.891"/><circle cx="15.891" cy="190.695" r="15.891"/><circle cx="15.891" cy="317.825" r="15.891"/></svg>',
	
	notice: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enable-background="new 0 0 512 512"><path d="m507.641,431.876l-224-384.002c-5.734-9.828-16.258-15.875-27.641-15.875-11.383,0-21.906,6.047-27.641,15.875l-224,384.002c-5.773,9.898-5.813,22.125-0.109,32.063 5.711,9.938 16.289,16.063 27.75,16.063h448.001c11.461,0 22.039-6.125 27.75-16.063 5.703-9.938 5.664-22.165-0.11-32.063zm-251.641-15.878c-17.656,0-32-14.328-32-32 0-17.672 14.344-32 32-32 17.688,0 32,14.328 32,32 0,17.671-14.312,32-32,32zm32-127.998c0,17.672-14.328,32-32,32s-32-14.328-32-32v-96c0-17.672 14.328-32 32-32s32,14.328 32,32v96z"/></svg>',
	
	message: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 483.3 483.3" style="enable-background:new 0 0 483.3 483.3;" xml:space="preserve"><path d="M424.3,57.75H59.1c-32.6,0-59.1,26.5-59.1,59.1v249.6c0,32.6,26.5,59.1,59.1,59.1h365.1c32.6,0,59.1-26.5,59.1-59.1v-249.5C483.4,84.35,456.9,57.75,424.3,57.75z M456.4,366.45c0,17.7-14.4,32.1-32.1,32.1H59.1c-17.7,0-32.1-14.4-32.1-32.1v-249.5c0-17.7,14.4-32.1,32.1-32.1h365.1c17.7,0,32.1,14.4,32.1,32.1v249.5H456.4z"/><path d="M304.8,238.55l118.2-106c5.5-5,6-13.5,1-19.1c-5-5.5-13.5-6-19.1-1l-163,146.3l-31.8-28.4c-0.1-0.1-0.2-0.2-0.2-0.3c-0.7-0.7-1.4-1.3-2.2-1.9L78.3,112.35c-5.6-5-14.1-4.5-19.1,1.1c-5,5.6-4.5,14.1,1.1,19.1l119.6,106.9L60.8,350.95c-5.4,5.1-5.7,13.6-0.6,19.1c2.7,2.8,6.3,4.3,9.9,4.3c3.3,0,6.6-1.2,9.2-3.6l120.9-113.1l32.8,29.3c2.6,2.3,5.8,3.4,9,3.4c3.2,0,6.5-1.2,9-3.5l33.7-30.2l120.2,114.2c2.6,2.5,6,3.7,9.3,3.7c3.6,0,7.1-1.4,9.8-4.2c5.1-5.4,4.9-14-0.5-19.1L304.8,238.55z"/></svg>',
	
	logout: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" y="0" x="0"><path style="stroke-linejoin:round;stroke:#ffffff;stroke-linecap:round;stroke-width:.1" transform="matrix(.95176 0 0 .95176 1.448 1.5234)" d="m37.875 10.719v8.219c6.368 3.37 9.988 10.454 8.719 17.75-1.419 8.156-8.472 14.011-16.75 13.937-8.279-0.074-15.228-6.101-16.5-14.281-1.124-7.228 2.496-14.194 8.781-17.5v-8.094c-8.321 2.854-14.296 9.88-16 18.125-0.5746 2.781-0.6446 5.686-0.1875 8.625 1.8285 11.757 11.946 20.549 23.844 20.656 11.897 0.107 22.179-8.496 24.218-20.218 2.039-11.723-4.765-23.27-16-27.188-0.042-0.015-0.082-0.018-0.125-0.031z"/><path style="stroke-linejoin:round;stroke:#ffffff;stroke-linecap:round;stroke-width:6" transform="matrix(.93992 0 0 .93992 1.776 3.8193)" d="m30.029 3.2505v26.078"/></svg>',
	
	settings: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 268.765 268.765" style="enable-background:new 0 0 268.765 268.765;" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M267.92,119.461c-0.425-3.778-4.83-6.617-8.639-6.617c-12.315,0-23.243-7.231-27.826-18.414c-4.682-11.454-1.663-24.812,7.515-33.231c2.889-2.641,3.24-7.062,0.817-10.133c-6.303-8.004-13.467-15.234-21.289-21.5c-3.063-2.458-7.557-2.116-10.213,0.825c-8.01,8.871-22.398,12.168-33.516,7.529c-11.57-4.867-18.866-16.591-18.152-29.176c0.235-3.953-2.654-7.39-6.595-7.849c-10.038-1.161-20.164-1.197-30.232-0.08c-3.896,0.43-6.785,3.786-6.654,7.689c0.438,12.461-6.946,23.98-18.401,28.672c-10.985,4.487-25.272,1.218-33.266-7.574c-2.642-2.896-7.063-3.252-10.141-0.853c-8.054,6.319-15.379,13.555-21.74,21.493c-2.481,3.086-2.116,7.559,0.802,10.214c9.353,8.47,12.373,21.944,7.514,33.53c-4.639,11.046-16.109,18.165-29.24,18.165c-4.261-0.137-7.296,2.723-7.762,6.597c-1.182,10.096-1.196,20.383-0.058,30.561c0.422,3.794,4.961,6.608,8.812,6.608c11.702-0.299,22.937,6.946,27.65,18.415c4.698,11.454,1.678,24.804-7.514,33.23c-2.875,2.641-3.24,7.055-0.817,10.126c6.244,7.953,13.409,15.19,21.259,21.508c3.079,2.481,7.559,2.131,10.228-0.81c8.04-8.893,22.427-12.184,33.501-7.536c11.599,4.852,18.895,16.575,18.181,29.167c-0.233,3.955,2.67,7.398,6.595,7.85c5.135,0.599,10.301,0.898,15.481,0.898c4.917,0,9.835-0.27,14.752-0.817c3.897-0.43,6.784-3.786,6.653-7.696c-0.451-12.454,6.946-23.973,18.386-28.657c11.059-4.517,25.286-1.211,33.281,7.572c2.657,2.89,7.047,3.239,10.142,0.848c8.039-6.304,15.349-13.534,21.74-21.494c2.48-3.079,2.13-7.559-0.803-10.213c-9.353-8.47-12.388-21.946-7.529-33.524c4.568-10.899,15.612-18.217,27.491-18.217l1.662,0.043c3.853,0.313,7.398-2.655,7.865-6.588C269.044,139.917,269.058,129.639,267.92,119.461z M134.595,179.491c-24.718,0-44.824-20.106-44.824-44.824c0-24.717,20.106-44.824,44.824-44.824c24.717,0,44.823,20.107,44.823,44.824C179.418,159.385,159.312,179.491,134.595,179.491z"/></svg>',
	
	star: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32.148 32.148" style="enable-background:new 0 0 32.148 32.148;" xml:space="preserve"><path d="M3.171,19.56c0,0,0.313-1.268-0.739-2.367c-1.056-1.101-2.382-1.105-2.382-1.105s-0.33,1.489,0.698,2.562C1.775,19.72,3.171,19.56,3.171,19.56z"/><path d="M5.5,19.33c0,0,1.233-0.669,1.459-2.139c0.227-1.466-0.9-2.498-0.9-2.498s-1.08,0.768-1.313,2.274C4.515,18.474,5.5,19.33,5.5,19.33z"/><path d="M7.354,23.029c0,0,1.136-0.827,1.169-2.312c0.03-1.483-1.221-2.358-1.221-2.358s-0.971,0.9-1.004,2.425C6.265,22.308,7.354,23.029,7.354,23.029z"/><path d="M11.076,22.754c-0.108-1.479-1.436-2.233-1.436-2.233s-0.882,0.987-0.772,2.508c0.11,1.521,1.262,2.136,1.262,2.136S11.183,24.234,11.076,22.754z"/><path d="M13.617,27.009c0,0,0.743-1.191,0.214-2.58c-0.529-1.388-2.019-1.728-2.019-1.728s-0.561,1.202-0.019,2.627C12.337,26.751,13.617,27.009,13.617,27.009z"/><path d="M3.685,16.312c0,0,0.966-0.879,0.699-2.379c-0.267-1.499-1.366-2.242-1.366-2.242s-1.101,1.058-0.841,2.521C2.437,15.672,3.685,16.312,3.685,16.312z"/><path d="M4.443,22.437c0,0-0.074-1.305-1.404-2.045c-1.333-0.738-2.602-0.355-2.602-0.355s0.124,1.521,1.422,2.242C3.159,23,4.443,22.437,4.443,22.437z"/><path d="M6.688,24.969c0,0-0.362-1.255-1.823-1.681c-1.464-0.426-2.616,0.23-2.616,0.23s0.461,1.455,1.886,1.871C5.562,25.806,6.688,24.969,6.688,24.969z"/><path d="M9.199,26.773c0,0-0.724-1.086-2.246-1.049c-1.524,0.037-2.424,1.01-2.424,1.01s0.88,1.25,2.363,1.213C8.377,27.913,9.199,26.773,9.199,26.773z"/><path d="M10.271,27.509c-1.508,0.221-2.284,1.294-2.284,1.294s1.021,1.136,2.491,0.923c1.471-0.214,2.148-1.442,2.148-1.442S11.778,27.292,10.271,27.509z"/><path d="M4.182,17.058l-0.727-0.029c-0.002,0.08-0.183,7.955,11.7,11.505l0.208-0.696C4.048,24.457,4.169,17.357,4.182,17.058z"/><path d="M28.977,19.581c0,0,1.396,0.16,2.423-0.912c1.028-1.072,0.698-2.562,0.698-2.562s-1.326,0.006-2.383,1.106C28.662,18.314,28.977,19.581,28.977,19.581z"/><path d="M25.188,17.212c0.226,1.469,1.459,2.139,1.459,2.139s0.984-0.855,0.755-2.361c-0.233-1.507-1.313-2.274-1.313-2.274S24.962,15.746,25.188,17.212z"/><path d="M24.846,18.379c0,0-1.251,0.875-1.222,2.358c0.033,1.483,1.169,2.312,1.169,2.312s1.089-0.722,1.057-2.245C25.816,19.282,24.846,18.379,24.846,18.379z"/><path d="M21.071,22.775c-0.106,1.479,0.946,2.408,0.946,2.408s1.15-0.613,1.262-2.135c0.109-1.521-0.772-2.509-0.772-2.509S21.181,21.294,21.071,22.775z"/><path d="M18.316,24.45c-0.529,1.388,0.214,2.579,0.214,2.579s1.279-0.258,1.823-1.68c0.542-1.425-0.02-2.628-0.02-2.628S18.847,23.062,18.316,24.45z"/><path d="M28.463,16.333c0,0,1.248-0.64,1.509-2.101c0.26-1.463-0.842-2.521-0.842-2.521s-1.1,0.743-1.365,2.242C27.497,15.454,28.463,16.333,28.463,16.333z"/><path d="M29.107,20.413c-1.33,0.739-1.404,2.044-1.404,2.044s1.285,0.564,2.584-0.157c1.298-0.721,1.422-2.243,1.422-2.243S30.44,19.673,29.107,20.413z"/><path d="M27.281,23.31c-1.461,0.426-1.823,1.681-1.823,1.681s1.128,0.836,2.555,0.421c1.425-0.415,1.886-1.871,1.886-1.871S28.745,22.883,27.281,23.31z"/><path d="M25.194,25.745c-1.522-0.037-2.246,1.05-2.246,1.05s0.821,1.139,2.307,1.174c1.483,0.036,2.363-1.213,2.363-1.213S26.72,25.783,25.194,25.745z"/><path d="M21.876,27.529c-1.508-0.217-2.354,0.773-2.354,0.773s0.678,1.229,2.147,1.443c1.471,0.213,2.491-0.924,2.491-0.924S23.384,27.75,21.876,27.529z"/><path d="M28.692,17.048l-0.728,0.029c0.013,0.301,0.134,7.398-11.181,10.779l0.208,0.695C28.875,25.003,28.694,17.128,28.692,17.048z"/><polygon points="21.771,20.214 20.945,13.495 25.443,8.924 18.996,8.062 16.076,2.404 16.076,2.376 13.15,8.042 6.704,8.903 11.202,13.475 10.377,20.193 16.071,17.099 16.071,17.117"/></svg>',
	
	token: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"	 width="31.678px" height="31.678px" viewBox="0 0 31.678 31.678" style="enable-background:new 0 0 31.678 31.678;"	 xml:space="preserve"><path d="M15.88,3.567c-0.013,0-0.038-0.003-0.038-0.003c-0.015,0-0.03-0.002-0.045-0.002c-5.352,0-9.691,4.34-9.691,9.69c0,5.353,4.339,9.691,9.691,9.691c0.013,0,0.025-0.001,0.038-0.002c0,0,0.03,0.008,0.045,0.008c5.353,0,9.691-4.34,9.691-9.692C25.571,7.908,21.232,3.567,15.88,3.567z"/><path d="M25.329,20.994c0.132-0.035,0.282-0.045,0.448-0.02c0.716,0.109,1.035-0.33,0.709-0.975c-0.324-0.647,0-1.21,0.722-1.25c0.724-0.042,0.944-0.538,0.492-1.103c-0.453-0.564-0.253-1.183,0.444-1.373c0.699-0.189,0.812-0.723,0.25-1.18c-0.561-0.458-0.491-1.104,0.15-1.438c0.645-0.331,0.645-0.871,0-1.204c-0.643-0.332-0.711-0.978-0.15-1.436c0.562-0.458,0.449-0.988-0.25-1.179c-0.697-0.19-0.897-0.809-0.444-1.374c0.452-0.563,0.231-1.06-0.492-1.101c-0.722-0.042-1.046-0.604-0.722-1.249c0.326-0.647,0.007-1.087-0.709-0.976c-0.715,0.108-1.149-0.373-0.965-1.073c0.184-0.7-0.219-1.063-0.896-0.808c-0.678,0.256-1.202-0.125-1.168-0.848c0.035-0.724-0.436-0.995-1.043-0.602c-0.609,0.391-1.202,0.127-1.318-0.588c-0.117-0.716-0.633-0.883-1.146-0.374c-0.514,0.51-1.15,0.374-1.412-0.3s-0.803-0.729-1.198-0.126c-0.215,0.328-0.503,0.46-0.787,0.433l0,0c-0.286,0.031-0.577-0.103-0.794-0.433c-0.396-0.604-0.936-0.548-1.198,0.126s-0.898,0.81-1.412,0.3c-0.515-0.51-1.03-0.343-1.147,0.373c-0.117,0.715-0.711,0.979-1.319,0.588C9.364,1.413,8.894,1.684,8.929,2.408C8.962,3.129,8.438,3.51,7.761,3.254C7.084,3,6.681,3.362,6.865,4.062S6.615,5.245,5.9,5.135C5.184,5.024,4.865,5.463,5.191,6.111c0.324,0.646,0,1.207-0.722,1.249c-0.723,0.041-0.944,0.537-0.492,1.1C4.431,9.026,4.23,9.645,3.533,9.834c-0.699,0.19-0.811,0.721-0.25,1.179s0.492,1.104-0.15,1.436c-0.645,0.333-0.645,0.873,0,1.204c0.643,0.334,0.711,0.979,0.15,1.438c-0.561,0.457-0.448,0.989,0.25,1.18c0.698,0.19,0.898,0.809,0.445,1.373c-0.452,0.563-0.231,1.061,0.492,1.103c0.722,0.04,1.046,0.603,0.722,1.25C4.865,20.64,5.184,21.08,5.9,20.97c0.167-0.026,0.316-0.017,0.448,0.02l-3.977,7.447h4.2l2.134,3.236l4.018-6.617c0.445-0.231,0.912-0.048,1.127,0.505c0.262,0.675,0.803,0.73,1.198,0.126c0.215-0.327,0.503-0.459,0.787-0.432v0.005c0.286-0.031,0.577,0.102,0.794,0.432c0.396,0.604,0.936,0.55,1.198-0.126c0.215-0.553,0.683-0.736,1.127-0.505l4.019,6.617l2.133-3.236h4.201L25.329,20.994zM20.993,22.49l-0.151,0.083c-1.486,0.788-3.181,1.239-4.979,1.239c-0.007,0-0.02-0.007-0.02-0.007c-0.009,0-0.018,0.001-0.027,0.001c-1.799,0-3.493-0.451-4.979-1.24l-0.152-0.083c-3.259-1.8-5.472-5.253-5.472-9.214c0-5.809,4.757-10.535,10.603-10.535c0.007,0,0.02,0.007,0.02,0.007c0.009,0,0.018-0.001,0.027-0.001c5.846,0,10.603,4.727,10.603,10.535C26.464,17.236,24.252,20.689,20.993,22.49z"/></svg>',
	
	facebook: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 455.73 455.73" style="enable-background:new 0 0 455.73 455.73;" xml:space="preserve"><path style="fill:#3A559F;" d="M0,0v455.73h242.704V279.691h-59.33v-71.864h59.33v-60.353c0-43.893,35.582-79.475,79.475-79.475h62.025v64.622h-44.382c-13.947,0-25.254,11.307-25.254,25.254v49.953h68.521l-9.47,71.864h-59.051V455.73H455.73V0H0z"/></svg>',
	
	googleplus: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 455.73 455.73" style="enable-background:new 0 0 455.73 455.73;" xml:space="preserve"><path style="fill:#DD4B39;" d="M0,0v455.73h455.73V0H0z M265.67,247.037c-7.793,51.194-45.961,80.543-95.376,80.543c-55.531,0-100.552-45.021-100.552-100.552c0-55.517,45.021-100.538,100.552-100.538c26.862,0,50.399,9.586,67.531,26.226l-28.857,28.857c-9.773-9.846-23.147-15.094-38.674-15.094c-32.688,0-59.189,27.874-59.189,60.548c0,32.703,26.501,59.768,59.189,59.768c27.397,0,48.144-13.243,54.129-39.758h-54.129v-40.38h95.131c1.142,6.506,1.72,13.315,1.72,20.37C267.144,234.025,266.638,240.69,265.67,247.037z M386.419,234.517h-35.233v35.218H326.16v-35.218h-35.233v-25.041h35.233v-35.233h25.026v35.233h35.233V234.517z"/></svg>',
	
	linkedin: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 455.731 455.731" style="enable-background:new 0 0 455.731 455.731;" xml:space="preserve"><rect x="0" y="0" style="fill:#0084B1;" width="455.731" height="455.731"/><path style="fill:#FFFFFF;" d="M107.255,69.215c20.873,0.017,38.088,17.257,38.043,38.234c-0.05,21.965-18.278,38.52-38.3,38.043c-20.308,0.411-38.155-16.551-38.151-38.188C68.847,86.319,86.129,69.199,107.255,69.215z"/><path style="fill:#FFFFFF;" d="M129.431,386.471H84.71c-5.804,0-10.509-4.705-10.509-10.509V185.18c0-5.804,4.705-10.509,10.509-10.509h44.721c5.804,0,10.509,4.705,10.509,10.509v190.783C139.939,381.766,135.235,386.471,129.431,386.471z"/><path style="fill:#FFFFFF;" d="M386.884,241.682c0-39.996-32.423-72.42-72.42-72.42h-11.47c-21.882,0-41.214,10.918-52.842,27.606c-1.268,1.819-2.442,3.708-3.52,5.658c-0.373-0.056-0.594-0.085-0.599-0.075v-23.418c0-2.409-1.953-4.363-4.363-4.363h-55.795c-2.409,0-4.363,1.953-4.363,4.363V382.11c0,2.409,1.952,4.362,4.361,4.363l57.011,0.014c2.41,0.001,4.364-1.953,4.364-4.363V264.801c0-20.28,16.175-37.119,36.454-37.348c10.352-0.117,19.737,4.031,26.501,10.799c6.675,6.671,10.802,15.895,10.802,26.079v117.808c0,2.409,1.953,4.362,4.361,4.363l57.152,0.014c2.41,0.001,4.364-1.953,4.364-4.363V241.682z"/></svg>',
	
	//user: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 17 17" style="enable-background:new 0 0 17 17;" xml:space="preserve"><path style="fill:#030104;" d="M13.5,5c0-1.381-0.56-2.631-1.464-3.535C11.131,0.56,9.881,0,8.5,0S5.869,0.56,4.964,1.465C4.06,2.369,3.5,3.619,3.5,5s0.56,2.631,1.464,3.535C5.869,9.44,7.119,10,8.5,10s2.631-0.56,3.536-1.465C12.94,7.631,13.5,6.381,13.5,5z"/><path style="fill:#030104;" d="M2.5,15c0,1,2.25,2,6,2c3.518,0,6-1,6-2c0-2-2.354-4-6-4C4.75,11,2.5,13,2.5,15z"/></svg>',
	
	//user: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 264.05 264.05" style="enable-background:new 0 0 264.05 264.05;" xml:space="preserve"><circle style="fill:#010002;" cx="126.77" cy="69.218" r="69.218"/><path style="fill:#010002;" d="M50.204,150.428l-22.86,49.702c-4.058,11.308,1.316,24.927,11.999,30.426l72.807,29.05c10.682,5.499,28.229,5.956,39.188,1.023l74.542-31.095c10.954-4.933,15.327-17.563,9.763-28.212l-29.578-52.09c-5.564-10.644-16.692-11.95-26.825-5.488c-11.732,7.484-29.436,15.218-52.471,15.218s-40.739-7.734-52.471-15.213C64.166,137.287,54.261,139.12,50.204,150.428z"/></svg>',
	
	user: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 46.202 46.202" style="enable-background:new 0 0 46.202 46.202;" xml:space="preserve"><path style="fill:#d0d0d0;" d="M43.418,2.271c-1.494-1.363-3.48-2.175-5.663-2.175H8.404c-4.575,0-8.295,3.636-8.401,8.185C0.002,8.361,0,8.421,0,8.5v29.201c0,4.641,3.762,8.404,8.404,8.404h29.394c4.644,0,8.404-3.764,8.404-8.404V8.5C46.202,6.02,45.126,3.81,43.418,2.271zM30.854,14.852c0,4.33-3.51,7.839-7.838,7.839c-4.327,0-7.837-3.509-7.837-7.839c0-4.328,3.51-7.838,7.837-7.838C27.346,7.013,30.854,10.523,30.854,14.852z M14.112,40.087c-2.005,0-3.63-1.625-3.63-3.63v-2.047c0-4.387,3.585-7.912,7.971-7.912h9.127c4.387,0,7.943,3.523,7.943,7.912v2.047c0,2.005-1.625,3.63-3.629,3.63H14.112z"/></svg>',
	
	edit: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M448,177.14V448c0,35.344-28.656,64-64,64H64c-35.344,0-64-28.656-64-64V128c0-35.344,28.656-64,64-64h270.844l-63.969,64H64v320h320V241.156L448,177.14z M398.875,45.25L376.25,67.875l67.875,67.891l22.625-22.625L398.875,45.25z M444.125,0L421.5,22.625l67.875,67.891L512,67.875L444.125,0z M150,294.188l67.875,67.875L421.5,158.406l-67.875-67.891L150,294.188zM128,384h64l-64-64V384z"/></svg>',
	
	message: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="10px" viewBox="0 0 483.3 483.3" style="enable-background:new 0 0 483.3 483.3;" xml:space="preserve"><path d="M424.3,57.75H59.1c-32.6,0-59.1,26.5-59.1,59.1v249.6c0,32.6,26.5,59.1,59.1,59.1h365.1c32.6,0,59.1-26.5,59.1-59.1v-249.5C483.4,84.35,456.9,57.75,424.3,57.75zM456.4,366.45c0,17.7-14.4,32.1-32.1,32.1H59.1c-17.7,0-32.1-14.4-32.1-32.1v-249.5c0-17.7,14.4-32.1,32.1-32.1h365.1c17.7,0,32.1,14.4,32.1,32.1v249.5H456.4z"/><path d="M304.8,238.55l118.2-106c5.5-5,6-13.5,1-19.1c-5-5.5-13.5-6-19.1-1l-163,146.3l-31.8-28.4c-0.1-0.1-0.2-0.2-0.2-0.3c-0.7-0.7-1.4-1.3-2.2-1.9L78.3,112.35c-5.6-5-14.1-4.5-19.1,1.1c-5,5.6-4.5,14.1,1.1,19.1l119.6,106.9L60.8,350.95c-5.4,5.1-5.7,13.6-0.6,19.1c2.7,2.8,6.3,4.3,9.9,4.3c3.3,0,6.6-1.2,9.2-3.6l120.9-113.1l32.8,29.3c2.6,2.3,5.8,3.4,9,3.4c3.2,0,6.5-1.2,9-3.5l33.7-30.2l120.2,114.2c2.6,2.5,6,3.7,9.3,3.7c3.6,0,7.1-1.4,9.8-4.2c5.1-5.4,4.9-14-0.5-19.1L304.8,238.55z"/></svg>',
	
	hourglass: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.319 235.319" enable-background="new 0 0 235.319 235.319"><path d="m201.094,29.997c2.649-0.623 4.623-2.996 4.623-5.835v-18.162c0-3.313-2.687-6-6-6h-164.114c-3.313,0-6,2.687-6,6v18.163c0,2.839 1.974,5.212 4.623,5.835 1.812,32.314 18.594,61.928 45.682,80.076l11.324,7.586-11.324,7.586c-27.089,18.147-43.871,47.762-45.682,80.076-2.649,0.623-4.623,2.996-4.623,5.835v18.163c0,3.313 2.687,6 6,6h164.114c3.313,0 6-2.687 6-6v-18.163c0-2.839-1.974-5.212-4.623-5.835-1.812-32.314-18.594-61.928-45.683-80.076l-11.324-7.586 11.324-7.586c27.089-18.148 43.871-47.763 45.683-80.077zm-159.491-17.997h152.114v6.163h-152.114v-6.163zm152.114,211.319h-152.114v-6.163h152.114v6.163zm-63.749-110.644c-1.663,1.114-2.661,2.983-2.661,4.985s0.998,3.871 2.661,4.985l18.765,12.571c23.71,15.883 38.49,41.705 40.333,69.941h-142.812c1.843-28.235 16.623-54.057 40.333-69.941l18.765-12.571c1.663-1.114 2.661-2.983 2.661-4.985s-0.998-3.871-2.661-4.985l-18.765-12.571c-23.71-15.884-38.49-41.706-40.333-69.941h142.812c-1.843,28.236-16.623,54.057-40.333,69.941l-18.765,12.571z"/><path d="m133.307,82.66h-31.295c-2.487,0-4.717,1.535-5.605,3.858-0.888,2.324-0.25,4.955 1.604,6.613l15.647,14c1.139,1.019 2.57,1.528 4,1.528s2.862-0.509 4-1.528l15.647-14c1.854-1.659 2.492-4.29 1.604-6.613-0.885-2.323-3.115-3.858-5.602-3.858z"/><path d="m117.414,140.581l-15.218,9.775c-13.306,8.914-21.292,23.876-21.292,39.892h76.511c0-16.016-7.986-30.978-21.292-39.892l-15.218-9.775c-1.074-0.644-2.416-0.644-3.491,0z"/></svg>',
};
//*/