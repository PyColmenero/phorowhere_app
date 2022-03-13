import base64

with open('data.txt') as f:
	lines = f.readlines()

# print(lines[len(lines)-1])

data = "";
for x in range(len(lines)):
	# print(lines[x])
	data += lines[x]

print(data)

imgdata = base64.b64decode(data)

filename = 'contribution.png'
with open(filename, 'wb') as f:
    f.write(imgdata)