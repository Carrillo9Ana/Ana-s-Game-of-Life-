import sys, pygame
import numpy as np
import math
import time

pygame.init()

size = width, height = 600, 600

nX_cells = 60
nY_cells = 60

dimCW = (width - 1) / nX_cells
dimCH = (height - 1) / nY_cells

bg = 25, 25, 25

screen = pygame.display.set_mode((height, width))

screen.fill(bg)

gameState = np.zeros((nX_cells, nY_cells))

gameState[21, 21] = 1
gameState[22, 22] = 1
gameState[22, 23] = 1
gameState[21, 23] = 1
gameState[20, 23] = 1

pauseExec = False

while 1:

    new_gameState = np.copy(gameState)

    # proceed events
    ev = pygame.event.get()

    for event in ev:
        if event.type == pygame.KEYDOWN:
            pauseExec = not pauseExec

        mouseClick = pygame.mouse.get_pressed()

        if sum(mouseClick) > 0:
            posX, posY = pygame.mouse.get_pos()

            if posX > 0 and posX < width-1 and posY > 0 and posY < height-1:
                new_gameState[math.floor(posX / dimCW),
                              math.floor(posY / dimCH)] = mouseClick[0] and not mouseClick[2]

    screen.fill(bg)

    for y in range(0, nY_cells):
        for x in range(0, nX_cells):
            # if its not on pause
            if not pauseExec:
                # calculate the number of neighbors near.
                n_neigh = gameState[(x - 1) % nX_cells, (y - 1) % nY_cells] + \
                          gameState[(x)     % nX_cells, (y - 1) % nY_cells] + \
                          gameState[(x + 1) % nX_cells, (y - 1) % nY_cells] + \
                          gameState[(x - 1) % nX_cells, (y) % nY_cells] + \
                          gameState[(x + 1) % nX_cells, (y) % nY_cells] + \
                          gameState[(x - 1) % nX_cells, (y + 1) % nY_cells] + \
                          gameState[(x)     % nX_cells, (y + 1) % nY_cells] + \
                          gameState[(x + 1) % nX_cells, (y + 1) % nY_cells]

            # Any dead cell with three live neighbors becomes a live cell.
            if gameState[x, y] == 0 and n_neigh == 3:
                new_gameState[x, y] = 1

            # Any cell with less than 2 or more than 3 neighbors dies. 
            elif gameState[x, y] == 1 and (n_neigh < 2 or n_neigh > 3):
                new_gameState[x, y] = 0

            # caculate each cell position.
            poly = [((x) * dimCW,     (y) * dimCH),
                    ((x + 1) * dimCW, (y) * dimCH),
                    ((x + 1) * dimCW, (y + 1) * dimCH),
                    ((x) * dimCW,     (y + 1) * dimCH)]

            # lets draw the state calculated in the grid
            if new_gameState[x, y] == 0:
                pygame.draw.polygon(screen, (128, 128, 128), poly, 1)
            else:
                pygame.draw.polygon(screen, (255, 255, 255), poly, 0)

    gameState = new_gameState

    time.sleep(0.1)

    pygame.display.flip()