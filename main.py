import pygame
import sys

from game_window_class import *

pygame.init()

WIDTH, HEIGHT = 800, 800
BACKGROUND = (0, 25, 25)
FBS = 60

def get_events():
    global running
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

def update():
    game_window.update()

def draw():
    window.fill(BACKGROUND)
    game_window.draw()


# The screen
window = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()
game_window = Game_window(window, 100, 180)

running = True
# while loop
while running:
    get_events()
    update()
    draw()
    pygame.display.update()
    clock.tick(FBS)
pygame.quit()
sys.exit()